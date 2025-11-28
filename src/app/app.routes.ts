// import { Routes } from '@angular/router';

// export const routes: Routes = [];

// app.routes.ts
import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  // Public routes
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'access-denied',
    loadComponent: () => import('./components/access-denied/access-denied-component').then(m => m.AccessDeniedComponent)
  },

  // Admin routes
  {
    path: 'admin',
    loadComponent: () => import('./components/admin/admin-component').then(m => m.AdminComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'admin' }
  },

  // Supervisor routes
  {
    path: 'supervisor',
    loadComponent: () => import('./components/supervisor/supervisor-component').then(m => m.SupervisorComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'supervisor' }
  },

  // Vendedor routes
  {
    path: 'vendedor',
    loadComponent: () => import('./components/vendedor/vendedor-component').then(m => m.VendedorComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'vendedor' }
  },

  //Permission-based routes
  {
    path: 'inventario',
    loadComponent: () => import('./components/inventario/inventario-component').then(m => m.InventarioComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { permission: 'inventario' }
  },
  {
    path: 'compras',
    loadComponent: () => import('./components/compras/compras-component').then(m => m.ComprasComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { permission: 'compras' }
  },
  {
    path: 'ventas',
    loadComponent: () => import('./components/ventas/ventas-component').then(m => m.VentasComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { permission: 'ventas' }
  },
  {
    path: 'roles',
    loadComponent: () => import('./components/roles/roles-component').then(m => m.RolesComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { permission: 'roles' }
  },
  {
    path: 'nomina',
    loadComponent: () => import('./components/nomina/nomina-component').then(m => m.NominaComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { permission: 'nomina' }
  },

  // Default route
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