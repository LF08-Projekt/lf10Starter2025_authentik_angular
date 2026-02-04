import {Qualification} from "../model/qualification";
import {QualificationsApi} from "./qualificationsApi";
import {toSignal} from "@angular/core/rxjs-interop";
import {Injectable, signal, Signal} from "@angular/core";

@Injectable({providedIn: "root"})
export class QualificationsDataService {
  private qualifications

  constructor(private qualificationApi: QualificationsApi) {
    this.qualifications = toSignal(this.qualificationApi.getAllQualifications(), {initialValue: []})
  }

  getQualifications() {
    return this.qualifications;
  }

  updateQualification(id: number, skill: string) {
    this.qualificationApi.updateQualification(id, skill);
  }

  postNewQualification(skill: string) {
    this.qualificationApi.postQualification(skill).subscribe((result) => {
      this.updateQualificationsList()
    });
  }

  deleteQualification(qualificationToDelete: Qualification) {
    this.qualificationApi.deleteQualification(qualificationToDelete).subscribe();
    const index = this.qualifications()?.findIndex(qualification => qualification.id === qualificationToDelete.id)
    this.qualifications().splice(index, 1);
  }

  qualificationHasEmployees(qualificationToDelete: Qualification) {
    return this.qualificationApi.getEmployeesByQualification(qualificationToDelete.id);
  }

  updateQualificationsList() {
    this.qualificationApi.getAllQualifications().subscribe( (result) => {
      this.qualifications().splice(0, this.qualifications().length)
      result.forEach((qualification) => {
        this.qualifications().push(qualification);
      })
    });
  }

}
