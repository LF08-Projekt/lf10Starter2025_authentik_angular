import {Component, inject, input, signal, Signal, viewChild, ViewChild, WritableSignal} from '@angular/core';
import {Qualification} from "../model/qualification";
import {QualificationsDataService} from "../services/qualificationsData.service";
import {FormField, form} from "@angular/forms/signals";
import { ConfirmationPopupComponent } from "../confirmation-popup/confirmation-popup.component";

@Component({
  selector: 'app-qualification-list',
  imports: [
    FormField,
    ConfirmationPopupComponent
  ],
  templateUrl: './qualification-list.component.html',
  styleUrl: './qualification-list.component.css',
})
export class QualificationListComponent {

  private confirmationPopUp = viewChild.required(ConfirmationPopupComponent);
  private qualificationToEdit: WritableSignal<Qualification>;
  public qualifications: Signal<Qualification[]>;
  public qualificationForm;
  public newQualificationForm;
  public newQualification: WritableSignal<Qualification>;
  public addNewQualification = false;
  public popUpText =  signal("Das sollte hier nicht stehen");
  public error = "";

  constructor(private qualificationsDataService: QualificationsDataService) {
    this.qualifications = this.qualificationsDataService.getQualifications();
    this.qualificationToEdit = signal({id: -1, skill: ""})
    this.qualificationForm = form(this.qualificationToEdit);
    this.newQualification = signal({id: -1, skill: ""})
    this.newQualificationForm = form(this.newQualification);
  }

  startEdit(qualification: Qualification) {
    this.qualificationToEdit = signal(qualification);
    this.qualificationForm.skill().value.set(qualification.skill)
    this.qualificationForm.id().value.set(qualification.id)
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
    this.qualificationsDataService.updateQualification(this.qualificationToEdit().id, this.qualificationToEdit().skill)
    this.qualificationToEdit = signal({id: -1, skill: ""})
  }

  startAddNewQualification() {
    this.addNewQualification = true;
  }

  saveNew() {
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
    this.qualificationsDataService.postNewQualification(this.newQualification().skill);
    this.addNewQualification = false;
    this.newQualificationForm.skill().value.set("")
  }

  abortNew() {
    this.addNewQualification = false;
    this.newQualificationForm.skill().value.set("")
  }

  deleteQualification(qualificationToDelete: Qualification) {
    this.qualificationsDataService.qualificationHasEmployees(qualificationToDelete).subscribe( (result) => {
      console.log(result);
      if (result.employees.length === 0) {
        this.qualificationsDataService.deleteQualification(qualificationToDelete);
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

}
