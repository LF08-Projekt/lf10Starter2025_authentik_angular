import {Injectable, output} from '@angular/core';
import {Qualification} from "../model/qualification";
import {QualificationsApi} from "./qualificationsApi";
import {toSignal} from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: 'root',
})
export class NewQualificationsDataService {
  private qualifications: Qualification[];

  public updatedQualifications = output<Qualification[]>();
  constructor(private qualificationApi: QualificationsApi) {
    this.qualifications = [];

    this.qualificationApi.getAllQualifications().subscribe(array => { this.setQualifications(array); });
  }

  getQualifications() {
    return this.qualifications;
  }
  setQualifications(newQualifications: Qualification[]) {
    this.qualifications = newQualifications;
    this.updatedQualifications.emit(this.qualifications);
  }

  updateQualification(id: number, skill: string) {
    this.qualificationApi.updateQualification(id, skill);
  }

  postNewQualification(skill: string) {
    this.qualificationApi.postQualification(skill);
  }

  deleteQualification(qualificationToDelete: Qualification) {
    this.qualificationApi.deleteQualification(qualificationToDelete);
  }
}
