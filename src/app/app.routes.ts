import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CallbackComponent } from './callback/callback.component';
import { authGuard } from './auth.guard';
import { QualificationListComponent } from './qualification-list/qualification-list.component';
import { EditEmployeeComponent } from "./components/edit-employee/edit-employee.component";
import {EmployeeListComponent} from "./components/employee-list/employee-list.component";
import {OldEmployeesPageComponent} from "./components/old-employees-page/old-employees-page.component";

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'callback', component: CallbackComponent },
  { path: 'employees', component: OldEmployeesPageComponent, canActivate: [authGuard] },
  { path: 'editEmployee', component: EditEmployeeComponent, canActivate: [authGuard] },
  { path: 'editEmployee/:id', component: EditEmployeeComponent, canActivate: [authGuard] },
  { path: 'qualification', component: QualificationListComponent, canActivate: [authGuard]},
  { path: '**', redirectTo: '' },
];
