# Apiservices

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.10.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


## Sistema de Autenticación con Roles - Angular
# Descripción
Sistema completo de autenticación y autorización en Angular que implementa control de acceso basado en roles (RBAC) con rutas protegidas, guardias de seguridad y una interfaz adaptativa según los permisos del usuario.

## Configuración de Servicios
# 1. Servicio de Autenticación (auth.service.ts)
Propósito: Manejar toda la lógica de autenticación, almacenamiento de tokens y gestión de sesiones.

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(this.getStoredUser());
  public currentUser$ = this.currentUserSubject.asObservable();

  // Mock data para demostración
  private mockUsers = {
    'admin@empresa.com': {
      user: {
        id: 1,
        email: 'admin@empresa.com',
        name: 'Administrador Principal',
        role: 'admin' as const,
        permissions: ['inventario', 'roles', 'compras', 'nomina', 'ventas']
      },
      token: 'admin_token_123'
    },
    // ... más usuarios
  };

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return new Observable<LoginResponse>(observer => {
      setTimeout(() => {
        const userData = this.mockUsers[credentials.email as keyof typeof this.mockUsers];
        
        if (userData && credentials.password === '123456') {
          const response: LoginResponse = {
            user: userData.user,
            token: userData.token,
            expiresIn: 3600
          };
          
          this.storeAuthData(response.token, response.user);
          this.currentUserSubject.next(response.user);
          observer.next(response);
          observer.complete();
        } else {
          observer.error(new Error('Credenciales inválidas'));
        }
      }, 1000);
    });
  }

  // Métodos auxiliares
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user ? user.role === role : false;
  }

  hasPermission(permission: string): boolean {
    const user = this.getCurrentUser();
    return user ? user.permissions.includes(permission) : false;
  }
}

# Características:
✅ Observables reactivos para el estado del usuario
✅ Almacenamiento seguro en localStorage
✅ Validación de permisos y roles
✅ Mock data para desarrollo sin backend


# 2. Servicio API Genérico (api.service.ts)
Propósito: Proporcionar métodos HTTP reutilizables con manejo centralizado de errores.

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  // Generic GET method
  get<T>(endpoint: string, params?: any): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    const options = params ? { params: new HttpParams({ fromObject: params }) } : {};
    
    return this.http.get<T>(url, options)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('API Service Error:', error);
    
    let userMessage = 'An error occurred';
    if (error.status === 401) {
      userMessage = 'Unauthorized access. Please login again.';
    } else if (error.status === 403) {
      userMessage = 'Access forbidden.';
    }
    // ... más manejo de errores
    
    return throwError(() => ({
      message: userMessage,
      originalError: error,
      status: error.status
    }));
  }
}


## Sistema de Guardias (Guards)
# 1. Guardia de Autenticación (auth.guard.ts)
Propósito: Proteger rutas que requieren autenticación.

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isAuthenticated()) {
      // Check role if specified in route data
      const requiredRole = route.data['role'];
      if (requiredRole && !this.authService.hasRole(requiredRole)) {
        this.router.navigate(['/access-denied']);
        return false;
      }
      
      return true;
    }

    // Redirect to login with return url
    this.router.navigate(['/login'], { 
      queryParams: { returnUrl: state.url } 
    });
    return false;
  }
}

# 2. Guardia de Roles (role.guard.ts)
Propósito: Proteger rutas basándose en roles y permisos específicos.

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const user = this.authService.getCurrentUser();
    
    if (!user) {
      this.router.navigate(['/login']);
      return false;
    }

    const requiredRole = route.data['role'];
    const requiredPermission = route.data['permission'];

    // Check role
    if (requiredRole && user.role !== requiredRole) {
      this.router.navigate(['/access-denied']);
      return false;
    }

    // Check permission
    if (requiredPermission && !user.permissions.includes(requiredPermission)) {
      this.router.navigate(['/access-denied']);
      return false;
    }

    return true;
  }
}


## Configuración de Rutas (app.routes.ts)
# Estrategia de Enrutamiento

export const routes: Routes = [
  // Public routes
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },

  // Role-based routes
  {
    path: 'admin',
    loadComponent: () => import('./features/admin/admin.component').then(m => m.AdminComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'admin' }  // ← Solo usuarios con rol 'admin'
  },
  {
    path: 'supervisor',
    loadComponent: () => import('./features/supervisor/supervisor.component').then(m => m.SupervisorComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'supervisor' }
  },

  // Permission-based routes
  {
    path: 'inventario',
    loadComponent: () => import('./features/modules/inventario/inventario.component').then(m => m.InventarioComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { permission: 'inventario' }  // ← Solo usuarios con permiso 'inventario'
  },
  {
    path: 'compras',
    loadComponent: () => import('./features/modules/compras/compras.component').then(m => m.ComprasComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { permission: 'compras' }
  },

  // Fallback routes
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];

# Jerarquía de Protección
RUTA PÚBLICA (login)
    ↓
RUTA PROTEGIDA → AuthGuard (¿está autenticado?)
    ↓
RUTA CON ROL → RoleGuard (¿tiene el rol correcto?)
    ↓  
RUTA CON PERMISO → RoleGuard (¿tiene el permiso específico?)


## Sistema de Roles y Permisos
# Matriz de Permisos por Rol

Rol	        Permisos	                                                Módulos Accesibles
Admin	    ['inventario', 'roles', 'compras', 'nomina', 'ventas']	    Todos los módulos
Supervisor	['inventario', 'compras', 'ventas']	                        Inventario, Compras, Ventas
Vendedor	['inventario', 'ventas']	                                Inventario, Ventas


## Implementación en Componentes
// En admin.component.ts
adminModules = [
  { name: 'Inventario', route: '/inventario', icon: '📦' },
  { name: 'Roles', route: '/roles', icon: '👥' },
  { name: 'Compras', route: '/compras', icon: '🛒' },
  { name: 'Nómina', route: '/nomina', icon: '💰' },
  { name: 'Ventas', route: '/ventas', icon: '📊' }
];

<!-- Visualización condicional basada en permisos -->
<div *ngFor="let module of adminModules" class="module-card">
  <div class="module-icon">{{ module.icon }}</div>
  <h3>{{ module.name }}</h3>
  <p>Acceso: {{ module.name }}, Ruta: "{{ module.route }}"</p>
  <a [routerLink]="module.route" class="access-btn">
    🔗 Acceder a {{ module.name }}
  </a>
</div>


## Flujo de Autenticación
# 1. Login y Redirección

login(credentials: LoginRequest): void {
  this.authService.login(credentials).subscribe({
    next: (response) => {
      // Redirección basada en rol
      this.redirectByRole(response.user.role);
    },
    error: (error) => {
      this.errorMessage = error.message;
    }
  });
}

private redirectByRole(role: string): void {
  switch (role) {
    case 'admin': this.router.navigate(['/admin']); break;
    case 'supervisor': this.router.navigate(['/supervisor']); break;
    case 'vendedor': this.router.navigate(['/vendedor']); break;
  }
}

# 2. Protección de Rutas en Tiempo Real

// Las guardias se ejecutan automáticamente al navegar
canActivate(route: ActivatedRouteSnapshot): boolean {
  const requiredRole = route.data['role'];
  if (requiredRole && !this.authService.hasRole(requiredRole)) {
    this.router.navigate(['/access-denied']);
    return false;
  }
  return true;
}


# 3. Gestión de Sesión

logout(): void {
  this.authService.logout();
  this.router.navigate(['/login']);
}


## Configuración de la Aplicación
# App Config (app.config.ts)

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,  // ← Interceptor para tokens
      multi: true
    }
  ]
};


# Environment Configuration
// environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api/v1'
};

// environment.production.ts  
export const environment = {
  production: true,
  apiUrl: 'https://api.tudominio.com/api/v1'
};


## Cómo Ejecutar el Proyecto
# 1. Instalación
bash
npm install

# 2. Servicio de Desarrollo
bash
ng serve

# 3. Cuentas de Prueba
Rol	        Email	                Password	Módulos
Admin	    admin@empresa.com	    123456	    Todos
Supervisor	supervisor@empresa.com	123456	    Inventario, Compras, Ventas
Vendedor	vendedor@empresa.com	123456	    Inventario, Ventas

# 4. Flujo de Prueba
Acceder a http://localhost:4200
Login con cualquier cuenta de prueba
Navegar entre módulos permitidos
Verificar que no se puede acceder a módulos no permitidos

## Características de Seguridad Implementadas
# Autenticación
Login con email y password
Almacenamiento seguro de tokens
Logout completo
Redirección automática post-login

# Autorización
Control de acceso basado en roles (RBAC)
Protección por permisos específicos
Guardias de rutas
Interfaz adaptativa según permisos

# UX/UI
Diseño responsivo
Feedback visual claro
Navegación intuitiva
Estados de carga y error

# Arquitectura
Separación de concerns
Servicios reutilizables
Componentes modulares
Configuración centralizada

## Notas de Implementación
# Patrones Utilizados
Observer Pattern (Observables para estado reactivo)
Guard Pattern (Protección de rutas)
Service Layer Pattern (Lógica de negocio en servicios)
Component-Based Architecture (Componentes reutilizables)

# Mejores Prácticas Aplicadas
Inyección de dependencias
Manejo centralizado de errores
Tipado fuerte con TypeScript
Separación de lógica y presentación
Rutas lazy-loaded para mejor performance