// core/guards/guest.guard.ts
import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      return true;
    }

    // Redirect authenticated users away from guest pages (like login)
    this.router.navigate(['/dashboard']);
    return false;
  }
}