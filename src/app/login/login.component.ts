import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errorMessage = signal<string>('');
  
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async onLogin() {
    if (this.loginForm.invalid) {
      this.errorMessage.set('Bitte geben Sie Benutzername und Passwort ein.');
      return;
    }

    this.errorMessage.set('');
    
    // Starte den OAuth-Flow mit Authentik
    await this.authService.login();
  }
}
