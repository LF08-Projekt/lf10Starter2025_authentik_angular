import {Component, input, Signal, signal, WritableSignal} from '@angular/core';
import {Employee} from "../../model/Employee";
import {EmployeeService} from "../../services/employee.service";
import {catchError, EMPTY} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-employee-list',
  imports: [
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent {
  employees = input.required<Employee[]>();

  constructor(public employeeService: EmployeeService) {

  }
}
