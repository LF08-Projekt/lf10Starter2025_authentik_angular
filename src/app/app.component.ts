import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {EditEmployeeComponent} from "./components/edit-employee/edit-employee.component";

@Component({
    selector: 'app-root',
  imports: [RouterOutlet, EditEmployeeComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lf10StarterNew';
}
