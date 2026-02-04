import {Component, computed, Signal, signal, WritableSignal} from '@angular/core';
import {Employee} from "../../model/Employee";
import {EmployeeService} from "../../services/employee.service";
import {catchError, EMPTY} from "rxjs";
import {EmployeeListComponent} from "../employee-list/employee-list.component";
import {QualificationsPageComponent} from "../qualifications-page/qualifications-page.component";
import {QualificationListComponent} from "../../qualification-list/qualification-list.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-old-employees-page',
  imports: [
    EmployeeListComponent,
    QualificationsPageComponent,
    QualificationListComponent,
    RouterLink,
  ],
  templateUrl: './old-employees-page.component.html',
  styleUrl: './old-employees-page.component.css',
})
export class OldEmployeesPageComponent {
  employees: WritableSignal<Employee[]>;
  searchTerm = signal<string>("");
  showedEmployess = computed<Employee[]>(() => {
    let output = new Array<Employee>();
    this.employees().forEach((employee: Employee) => {
      if (employee.getFullName().toLowerCase().includes(this.searchTerm().toLowerCase())
        || employee.getFullPhoneNumber().toLowerCase().includes(this.searchTerm().toLowerCase())
        || employee.getFullAddress().toLowerCase().includes(this.searchTerm().toLowerCase())
        || employee.getFullSkillDescription().toLowerCase().includes(this.searchTerm().toLowerCase())) {
        output.push(employee);
      }
    });

    return output;
  })

  constructor(public employeeService: EmployeeService) {
    this.employees = signal<Employee[]>(new Array<Employee>());
    this.Load();
  }

  private Load(): void {
    this.employeeService.getEmployees()
      .pipe(catchError((err) => {
        this.employees.set(new Array<Employee>());
        return EMPTY;
      }))
      .subscribe((s) => {
        this.employees.set(s);
      });
  }


}
