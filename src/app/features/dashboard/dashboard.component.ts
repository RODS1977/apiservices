// features/dashboard/dashboard.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard">
      <header>
        <h1>Dashboard</h1>
        <div class="user-info">
          <span>Welcome, {{ user?.name }}!</span>
          <button (click)="logout()" class="btn btn-secondary">Logout</button>
        </div>
      </header>
      
      <nav>
        <a routerLink="/profile">Profile</a>
        <a *ngIf="user?.role === 'admin'" routerLink="/admin">Admin Panel</a>
      </nav>
      
      <main>
        <h2>Protected Content</h2>
        <p>This content is only visible to authenticated users.</p>
      </main>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthService);
  private apiService = inject(ApiService);
  private router = inject(Router);

  user = this.authService.getCurrentUser();
  protectedData: any;

  ngOnInit() {
    this.loadProtectedData();
  }

  loadProtectedData() {
    this.apiService.get('protected-data').subscribe({
      next: (data) => {
        this.protectedData = data;
      },
      error: (error) => {
        console.error('Failed to load protected data:', error);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}