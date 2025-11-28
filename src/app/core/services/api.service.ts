// core/services/api.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  // Generic GET method
  get<T>(endpoint: string, params?: any): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    const options = params ? { params: new HttpParams({ fromObject: params }) } : {};
    
    return this.http.get<T>(url, options)
      .pipe(catchError(this.handleError));
  }

  // Generic POST method
  post<T>(endpoint: string, data: any): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.post<T>(url, data)
      .pipe(catchError(this.handleError));
  }

  // Generic PUT method
  put<T>(endpoint: string, data: any): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.put<T>(url, data)
      .pipe(catchError(this.handleError));
  }

  // Generic DELETE method
  delete<T>(endpoint: string): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.delete<T>(url)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('API Service Error:', error);
    
    let userMessage = 'An error occurred';
    if (error.status === 401) {
      userMessage = 'Unauthorized access. Please login again.';
    } else if (error.status === 403) {
      userMessage = 'Access forbidden.';
    } else if (error.status === 404) {
      userMessage = 'Resource not found.';
    } else if (error.status >= 500) {
      userMessage = 'Server error. Please try again later.';
    }
    
    return throwError(() => ({
      message: userMessage,
      originalError: error,
      status: error.status
    }));
  }
}