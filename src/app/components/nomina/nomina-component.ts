// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-nomina',
//   imports: [],
//   templateUrl: './nomina-component.html',
//   styleUrl: './nomina-component.css',
// })
// export class NominaComponent {

// }

// features/modules/nomina/nomina.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '..//navbar/navbar.component';

@Component({
  selector: 'app-nomina',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <div class="module-container">
      <h1>💰 Módulo de Nómina</h1>
      <p>Acceso: Nómina, Ruta: "../nomina"</p>
      <div class="module-content">
        <p>Este es el módulo de gestión de nómina.</p>
        <p>Aquí puedes gestionar salarios, deducciones y pagos a empleados.</p>
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
export class NominaComponent { }