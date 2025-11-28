// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-roles',
//   imports: [],
//   templateUrl: './roles-component.html',
//   styleUrl: './roles-component.css',
// })
// export class RolesComponent {

// }

// features/modules/roles/roles.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '..//navbar/navbar.component';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <div class="module-container">
      <h1>👥 Módulo de Roles</h1>
      <p>Acceso: Roles, Ruta: "../roles"</p>
      <div class="module-content">
        <p>Este es el módulo de gestión de roles y permisos.</p>
        <p>Aquí puedes gestionar usuarios, roles y permisos del sistema.</p>
      </div>
    </div>
  `,
  styles: [`
    .module-container {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }
    h1 { color: #333; margin-bottom: 1rem; }
    .module-content {
      background: #f8f9fa;
      padding: 1.5rem;
      border-radius: 8px;
      margin-top: 1rem;
    }
  `]
})
export class RolesComponent { }