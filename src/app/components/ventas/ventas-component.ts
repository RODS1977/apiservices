// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-ventas',
//   imports: [],
//   templateUrl: './ventas-component.html',
//   styleUrl: './ventas-component.css',
// })
// export class VentasComponent {

// }

// features/modules/ventas/ventas.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '..//navbar/navbar.component';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <div class="module-container">
      <h1>📊 Módulo de Ventas</h1>
      <p>Acceso: Ventas, Ruta: "../ventas"</p>
      <div class="module-content">
        <p>Este es el módulo de gestión de ventas.</p>
        <p>Aquí puedes gestionar clientes, pedidos y reportes de ventas.</p>
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
export class VentasComponent { }