import {
  Component,
  computed,
  inject,
  input,
  output,
  signal,
  Signal,
  viewChild,
  ViewChild,
  WritableSignal
} from '@angular/core';
import {Qualification} from "../model/qualification";
import {QualificationsDataService} from "../services/qualificationsData.service";
import {FormField, form} from "@angular/forms/signals";
import { ConfirmationPopupComponent } from "../confirmation-popup/confirmation-popup.component";
import {setActiveConsumer} from "@angular/core/primitives/signals";
import {catchError} from "rxjs";
import {QualificationsApi} from "../services/qualificationsApi";
import {MatFormField, MatLabel} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {ComboboxComponent} from "../components/combobox/combobox.component";

@Component({
  selector: 'app-qualification-list',
  imports: [
    FormField,
    ConfirmationPopupComponent,
    ComboboxComponent
  ],
  templateUrl: './qualification-list.component.html',
  styleUrl: './qualification-list.component.css',
})
export class QualificationListComponent {
  protected allQualifications = signal<Qualification[]>([]);

  private confirmationPopUp = viewChild.required(ConfirmationPopupComponent);
  private qualificationToEdit: WritableSignal<Qualification>;

  public qualifications = input.required<Qualification[]>();
  public canUpdateQualifications = input<boolean>(false);
  public employeeContext = input<boolean>(true);

  protected missingQualifications = computed(() => {
    return this.allQualifications()
      .filter(q => this.qualifications().findIndex(q2 => q.id == q2.id) == -1)
      .map(q => q.skill);
  });

  public qualificationForm;
  public newQualificationForm;
  public newQualification: WritableSignal<Qualification>;
  public addNewQualification = false;
  public popUpText =  signal("Das sollte hier nicht stehen");
  public error = "";
  public filteredQualifications: Qualification[] = [];

  public newQualificationEvent = output<Qualification>();
  public selectQualificationEvent = output<Qualification>();
  public updateQualificationEvent = output<Qualification>();
  public deleteQualificationEvent = output<Qualification>();

  constructor(private qualificationsApi: QualificationsApi, public qualificationsDataService: QualificationsDataService) {
    this.qualificationToEdit = signal({id: -1, skill: ""})
    this.qualificationForm = form(this.qualificationToEdit);
    this.newQualification = signal({id: -1, skill: ""})
    this.newQualificationForm = form(this.newQualification);

    this.fetchAllQualifications();
  }

  fetchAllQualifications(callback?: () => void) {
    return this.qualificationsApi.getAllQualifications()
      .pipe(catchError((err) => {
        // TODO: error message

        return [];
      }))
      .subscribe(q => {
        this.allQualifications.set(q)
        callback?.();
      });
  }

  startEdit(qualification: Qualification) {
    this.qualificationToEdit.set(qualification);
    this.qualificationForm.skill().value.set(qualification.skill)
    this.qualificationForm.id().value.set(qualification.id)
  }

  newSkillInputChanged(input: string) {
    console.log("got info: " + input);
    this.newQualification().skill = input;
  }

  isEditQualification(qualification: Qualification) {
    if(this.qualificationToEdit() === qualification) {
      return true;
    } else {
      return false;
    }
  }

  saveEdit() {
    this.qualificationToEdit().skill = this.qualificationForm.skill().value()
    const index = this.qualifications().findIndex(qualification => this.qualificationToEdit().id === qualification.id)
    this.qualifications()[index] = this.qualificationToEdit()

    this.updateQualificationEvent.emit(this.qualificationToEdit());

    this.qualificationToEdit = signal({id: -1, skill: ""})
  }

  startAddNewQualification() {
    this.addNewQualification = true;
  }

  saveNew() {
    console.log(this.newQualification());
    const existing = this.allQualifications().find(q => q.skill === this.newQualification().skill);
    if (existing == undefined) {
      this.newQualificationEvent.emit(this.newQualification());
      this.addNewQualification = false;
    }
    else {
      this.selectQualificationEvent.emit(existing);
    }

    let qualificationExists: Boolean = false;
    this.qualifications().map((qualification) => {
      if (qualification.skill == this.newQualificationForm.skill().value()) {
        qualificationExists = true
      }
    })
    if (qualificationExists) {
      this.error = "Es gibt bereits eine Qualification mit diesem Namen!"
      return
    }
    this.newQualification().skill = this.newQualificationForm.skill().value();


    this.newQualificationForm.skill().value.set("")
  }

  abortNew() {
    this.addNewQualification = false;
    this.newQualificationForm.skill().value.set("")
  }

  deleteQualification(qualificationToDelete: Qualification) {
    this.deleteQualificationEvent.emit(qualificationToDelete);
    this.qualificationsDataService.qualificationHasEmployees(qualificationToDelete).subscribe( (result) => {
      if (result.employees.length === 0) {
        this.qualificationsDataService.deleteQualification(qualificationToDelete);
        const index = this.qualifications()?.findIndex(qualification => qualification.id === qualificationToDelete.id)
        this.qualifications().splice(index, 1);
        this.filteredQualifications = [];
      } else {
        this.error = "Es gibt noch Mitarbeiter mit dieser Qualifikation"
      }
    })
  }

  openDeletePopup(qualification: Qualification) {
    this.confirmationPopUp().showMessage("Sicher das du das Löschen willst?", () => this.deleteQualification(qualification));
  }

  cancelNew() {
    this.confirmationPopUp().showMessage("Sicher das du das erstellen Abbrechen willst?", () => this.abortNew());
  }

  filterQualifications(searchWord: string) {
    this.filteredQualifications = []
    if (searchWord == "") {
      return
    }
    this.qualifications().map( (qualification) => {
      if (qualification.skill.toLowerCase().includes(searchWord.toLowerCase())) {
        this.filteredQualifications.push(qualification);
      }
    })
  }

}
