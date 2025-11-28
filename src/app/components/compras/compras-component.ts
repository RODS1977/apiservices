// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-compras',
//   imports: [],
//   templateUrl: './compras-component.html',
//   styleUrl: './compras-component.css',
// })
// export class ComprasComponent {

// }

// features/modules/compras/compras.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '..//navbar/navbar.component';

@Component({
  selector: 'app-compras',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <div class="module-container">
      <h1>🛒 Módulo de Compras</h1>
      <p>Acceso: Compras, Ruta: "../compras"</p>
      <div class="module-content">
        <p>Este es el módulo de gestión de compras.</p>
        <p>Aquí puedes gestionar proveedores, órdenes de compra y cotizaciones.</p>
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
export class ComprasComponent { }