import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // URL base de nuestro backend
  private readonly API_URL = 'http://localhost:3000/api';
  
  // Subject para manejar el estado de autenticación
  private isAdminSubject = new BehaviorSubject<boolean>(false);
  isAdmin$ = this.isAdminSubject.asObservable();
  
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient
  ) {
    if (this.isBrowser()) {
      if (!localStorage.getItem('isAdmin')) {
        this.isAdminSubject.next(false);
        localStorage.removeItem('isAdmin');
      } else {
        this.checkAdminStatus();
      }
    }
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  // Método de login que se conecta al backend
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.API_URL}/auth/login`, { username, password })
      .pipe(
        tap((response: any) => {
          if (response.token) {
            if (this.isBrowser()) {
              localStorage.setItem('token', response.token);
              localStorage.setItem('isAdmin', 'true');
            }
            this.isAdminSubject.next(true);
          }
        })
      );
  }

  logout() {
    this.isAdminSubject.next(false);
    if (this.isBrowser()) {
      localStorage.removeItem('token');
      localStorage.removeItem('isAdmin');
    }
  }

  checkAdminStatus() {
    if (this.isBrowser()) {
      const token = localStorage.getItem('token');
      const isAdmin = !!token;
      this.isAdminSubject.next(isAdmin);
    } else {
      this.isAdminSubject.next(false);
    }
  }

  // Obtener el token para las peticiones autenticadas
  getToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem('token');
    }
    return null;
  }
}