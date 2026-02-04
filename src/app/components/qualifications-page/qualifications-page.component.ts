import {Component, signal, Signal, viewChild, WritableSignal} from '@angular/core';
import {QualificationsDataService} from "../../services/qualificationsData.service";
import {Qualification} from "../../model/qualification";
import {QualificationListComponent} from "../../qualification-list/qualification-list.component";
import {QualificationsApi} from "../../services/qualificationsApi";
import {MenuComponent} from "../menu/menu.component";
import {ConfirmationPopupComponent} from "../../confirmation-popup/confirmation-popup.component";

@Component({
  selector: 'app-qualifications-page',
  imports: [
    QualificationListComponent,
    MenuComponent,
    ConfirmationPopupComponent
  ],
  templateUrl: './qualifications-page.component.html',
  styleUrl: './qualifications-page.component.css',
})
export class QualificationsPageComponent {
  qualifications= signal<Qualification[]>([]);
  private confirmationPopUp = viewChild.required(ConfirmationPopupComponent);

  constructor(private qualificationsApi: QualificationsApi, private qualificationsDataService: QualificationsDataService) {
    console.log("fetch");
    this.fetchQualifications();
  }

  private fetchQualifications() {
    try {
      this.qualificationsApi.getAllQualifications().subscribe(q => {
        this.qualifications.set(q)
        console.log(this.qualifications());
      });
    }
    catch(e) {
      // TODO: message box
    }
  }

  onNewQualification(qualification: Qualification) {
    console.log(qualification);
    this.qualificationsApi.postQualification(qualification.skill).subscribe((dto) => {
      this.qualificationsApi.getAllQualifications().subscribe(array => {
        this.qualifications.set(array);
      })
    });
  }

  onUpdateQualification(qualification: Qualification) {
    try {
      this.qualificationsApi.updateQualification(qualification.id, qualification.skill).subscribe((result) => {
        this.fetchQualifications();
      });
    }
    catch (e) {
      // TODO: message box

      this.fetchQualifications();
    }
  }

  onDeleteQualification(qualification: Qualification) {
    this.qualificationsApi.getEmployeesByQualification(qualification.id).subscribe((result) => {
        if (result.employees.length === 0) {
          this.qualificationsApi.deleteQualification(qualification).subscribe(() => {
            this.fetchQualifications();
          });
        } else {
          this.confirmationPopUp().showMessage("Es gibt noch Mitarbeiter mit dieser Qualifikation");
        }
      }
    );
  }
}
