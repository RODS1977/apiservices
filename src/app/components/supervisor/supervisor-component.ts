// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-supervisor-component',
//   imports: [],
//   templateUrl: './supervisor-component.html',
//   styleUrl: './supervisor-component.css',
// })
// export class SupervisorComponent {

// }

// features/supervisor/supervisor.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-supervisor',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent],
  templateUrl: './supervisor-component.html',
  styleUrls: ['./supervisor-component.css']
})
export class SupervisorComponent {
  private authService = inject(AuthService);
  
  user = this.authService.getCurrentUser();
  
  supervisorModules = [
    { name: 'Inventario', route: '/inventario', icon: '📦' },
    { name: 'Compras', route: '/compras', icon: '🛒' },
    { name: 'Ventas', route: '/ventas', icon: '📊' }
  ];
}