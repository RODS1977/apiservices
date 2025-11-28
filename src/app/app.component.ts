import { Component } from "@angular/core";
import { ApiService } from "./core/services/api.service";
import { AuthService } from "./core/services/auth.service";
import { RouterOutlet } from "@angular/router";

export class MyComponent {
  constructor(private authService: AuthService, private apiService: ApiService) {}
  
  // Verificar autenticación
//   if (this.authService.isAuthenticated()) {
//     // Usuario logueado
//   },
  
//   // Hacer llamadas API protegidas
//   this.apiService.get('protected-endpoint').subscribe(data => {
//     // Los tokens se envían automáticamente
//   });
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <router-outlet></router-outlet>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background: #f5f5f5;
    }
  `]
})
export class AppComponent {
  title = 'sistema-autenticacion';
}