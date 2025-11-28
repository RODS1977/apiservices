// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-access-denied-component',
//   imports: [],
//   templateUrl: './access-denied-component.html',
//   styleUrl: './access-denied-component.css',
// })
// export class AccessDeniedComponent {

// }

// features/shared/access-denied/access-denied.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-access-denied',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="access-denied-container">
      <div class="access-denied-card">
        <div class="icon">🚫</div>
        <h1>Acceso Denegado</h1>
        <p>No tienes permisos para acceder a esta sección.</p>
        <p>Contacta al administrador si necesitas acceso.</p>
        <button (click)="goBack()" class="back-btn">
          ↩️ Volver al Inicio
        </button>
      </div>
    </div>
  `,
  styles: [`
    .access-denied-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #ff6b6b, #ee5a52);
      padding: 20px;
    }
    .access-denied-card {
      background: white;
      padding: 3rem;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      text-align: center;
      max-width: 400px;
    }
    .icon {
      font-size: 4rem;
      margin-bottom: 1rem;
    }
    h1 {
      color: #333;
      margin-bottom: 1rem;
    }
    p {
      color: #666;
      margin-bottom: 0.5rem;
    }
    .back-btn {
      padding: 0.75rem 1.5rem;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      margin-top: 1rem;
      transition: background 0.3s ease;
    }
    .back-btn:hover {
      background: #5a6fd8;
    }
  `]
})
export class AccessDeniedComponent {
  private router = inject(Router);

  goBack(): void {
    this.router.navigate(['/']);
  }
}