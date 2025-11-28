// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-admin-component',
//   imports: [],
//   templateUrl: './admin-component.html',
//   styleUrl: './admin-component.css',
// })
// export class AdminComponent {

// }
// features/admin/admin.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent],
  templateUrl: './admin-component.html',
  styleUrls: ['./admin-component.css']
})
export class AdminComponent {
  private authService = inject(AuthService);
  
  user = this.authService.getCurrentUser();
  
  adminModules = [
    { name: 'Inventario', route: '/inventario', icon: '📦' },
    { name: 'Roles', route: '/roles', icon: '👥' },
    { name: 'Compras', route: '/compras', icon: '🛒' },
    { name: 'Nómina', route: '/nomina', icon: '💰' },
    { name: 'Ventas', route: '/ventas', icon: '📊' }
  ];
}