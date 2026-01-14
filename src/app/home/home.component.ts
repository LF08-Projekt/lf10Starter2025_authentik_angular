import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div style="text-align: center; margin-top: 50px;">
      <h1>LF10-Starter</h1>
      <p>Willkommen! Bitte melden Sie sich an, um die Mitarbeiterliste zu sehen.</p>
      <button (click)="goToEmployees()" style="padding: 10px 20px; font-size: 16px; cursor: pointer;">
        Zur Anwendung
      </button>
    </div>
  `,
  styles: [`
    button {
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
    }
    button:hover {
      background-color: #45a049;
    }
  `]
})
export class HomeComponent {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  goToEmployees() {
    this.router.navigate(['/employees']);
  }
}
