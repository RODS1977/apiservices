// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-vendedor-component',
//   imports: [],
//   templateUrl: './vendedor-component.html',
//   styleUrl: './vendedor-component.css',
// })
// export class VendedorComponent {

// }

// features/vendedor/vendedor.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-vendedor',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent],
  templateUrl: './vendedor-component.html',
  styleUrls: ['./vendedor-component.css']
})
export class VendedorComponent {
  private authService = inject(AuthService);
  
  user = this.authService.getCurrentUser();
  
  vendedorModules = [
    { name: 'Inventario', route: '/inventario', icon: '📦' },
    { name: 'Ventas', route: '/ventas', icon: '📊' }
  ];
}