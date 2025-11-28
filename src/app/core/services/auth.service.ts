// core/services/auth.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, throwError } from 'rxjs';
import { User, LoginRequest, LoginResponse } from '../models/user.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private tokenKey = 'auth_token';
  private userKey = 'user_data';
  
  private currentUserSubject = new BehaviorSubject<User | null>(this.getStoredUser());
  public currentUser$ = this.currentUserSubject.asObservable();

  // Mock data for demonstration - replace with real API calls
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
    'supervisor@empresa.com': {
      user: {
        id: 2,
        email: 'supervisor@empresa.com',
        name: 'Supervisor General',
        role: 'supervisor' as const,
        permissions: ['inventario', 'compras', 'ventas']
      },
      token: 'supervisor_token_123'
    },
    'vendedor@empresa.com': {
      user: {
        id: 3,
        email: 'vendedor@empresa.com',
        name: 'Vendedor Ejemplo',
        role: 'vendedor' as const,
        permissions: ['inventario', 'ventas']
      },
      token: 'vendedor_token_123'
    }
  };

  // Login method
  // login(credentials: LoginRequest): Observable<LoginResponse> {
  //   return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials)
  //     .pipe(
  //       tap(response => {
  //         this.storeAuthData(response.token, response.user);
  //         this.currentUserSubject.next(response.user);
  //       }),
  //       catchError(this.handleError)
  //     );
  // }

    login(credentials: LoginRequest): Observable<LoginResponse> {
    // Simulate API call with delay
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

  // Logout method
  // logout(): void {
  //   localStorage.removeItem(this.tokenKey);
  //   localStorage.removeItem(this.userKey);
  //   this.currentUserSubject.next(null);
  // }

  // // Check if user is authenticated
  // isAuthenticated(): boolean {
  //   const token = this.getToken();
  //   if (!token) return false;
    
  //   // Check token expiration (basic implementation)
  //   try {
  //     const payload = JSON.parse(atob(token.split('.')[1]));
  //     return payload.exp > Date.now() / 1000;
  //   } catch {
  //     return false;
  //   }
  // }

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.userKey);
      this.currentUserSubject.next(null);
    }
  }

  isAuthenticated(): boolean {
    let tk = this.getToken();
    console.log(tk);
    return !!tk;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      console.log(`tokenKey = ${this.tokenKey}, localStorage.getItem(this.tokenKey) = ${localStorage.getItem(this.tokenKey)}`);
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user ? user.role === role : false;
  }

  hasPermission(permission: string): boolean {
    const user = this.getCurrentUser();
    return user ? user.permissions.includes(permission) : false;
  }

  private storeAuthData(token: string, user: User): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.tokenKey, token);
      localStorage.setItem(this.userKey, JSON.stringify(user));
    }
  }

  private getStoredUser(): User | null {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem(this.userKey);
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  } 
}

//   // Get current user
//   getCurrentUser(): User | null {
//     return this.currentUserSubject.value;
//   }

//   // Get token
//   getToken(): string | null {
//     return localStorage.getItem(this.tokenKey);
//   }

//   // Check user role
//   hasRole(role: string): boolean {
//     const user = this.getCurrentUser();
//     return user ? user.role === role : false;
//   }

//   // Private methods
//   private storeAuthData(token: string, user: User): void {
//     localStorage.setItem(this.tokenKey, token);
//     localStorage.setItem(this.userKey, JSON.stringify(user));
//   }

//   private getStoredUser(): User | null {
//     const userData = localStorage.getItem(this.userKey);
//     return userData ? JSON.parse(userData) : null;
//   }

//   private handleError(error: any): Observable<never> {
//     let errorMessage = 'An error occurred';
    
//     if (error.error instanceof ErrorEvent) {
//       // Client-side error
//       errorMessage = error.error.message;
//     } else {
//       // Server-side error
//       errorMessage = error.error?.message || error.message || 'Server error';
//     }
    
//     console.error('Auth Service Error:', error);
//     return throwError(() => new Error(errorMessage));
//   }
// }