// features/auth/login/login.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  isLoading = false;
  errorMessage = '';

  // Demo accounts for testing
  demoAccounts = [
    { email: 'admin@empresa.com', password: '123456', role: 'Admin' },
    { email: 'supervisor@empresa.com', password: '123456', role: 'Supervisor' },
    { email: 'vendedor@empresa.com', password: '123456', role: 'Vendedor' }
  ];

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const credentials = this.loginForm.value as { email: string; password: string };
      
      this.authService.login(credentials).subscribe({
        next: (response) => {
          // Redirect based on role
          this.redirectByRole(response.user.role);
        },
        error: (error) => {
          this.errorMessage = error.message;
          this.isLoading = false;
        }
      });
    }
  }

  private redirectByRole(role: string): void {
    switch (role) {
      case 'admin':
        this.router.navigate(['/admin']);
        break;
      case 'supervisor':
        this.router.navigate(['/supervisor']);
        break;
      case 'vendedor':
        this.router.navigate(['/vendedor']);
        break;
      default:
        this.router.navigate(['/login']);
    }
  }

  useDemoAccount(account: { email: string; password: string }): void {
    this.loginForm.patchValue({
      email: account.email,
      password: account.password
    });
  }
}