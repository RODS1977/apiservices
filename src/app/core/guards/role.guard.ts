// core/guards/role.guard.ts
import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const user = this.authService.getCurrentUser();
    
    if (!user) {
      this.router.navigate(['/login']);
      return false;
    }

    const requiredRole = route.data['role'];
    const requiredPermission = route.data['permission'];

    // Check role
    if (requiredRole && user.role !== requiredRole) {
      this.router.navigate(['/access-denied']);
      return false;
    }

    // Check permission
    if (requiredPermission && !user.permissions.includes(requiredPermission)) {
      this.router.navigate(['/access-denied']);
      return false;
    }

    return true;
  }
}