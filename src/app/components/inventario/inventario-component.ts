// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-inventario',
//   imports: [],
//   templateUrl: './inventario-component.html',
//   styleUrl: './inventario-component.css',
// })
// export class InventarioComponent {

// }

// features/modules/inventario/inventario.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <div class="module-container">
      <h1>📦 Módulo de Inventario</h1>
      <p>Acceso: Inventario, Ruta: "../inventario"</p>
      <div class="module-content">
        <p>Este es el módulo de gestión de inventario.</p>
        <p>Aquí puedes gestionar productos, stock y categorías.</p>
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
export class InventarioComponent { }