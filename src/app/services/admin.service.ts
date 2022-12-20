import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

// Rxjs
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

// Interfaces
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { AdminForm } from '../interfaces/admin-form.interface';

// Environment
import { environment } from 'src/environments/environment';

// URL para peticiones
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  // Variables
  private admin!: string;

  constructor (
    private http: HttpClient,
    private router: Router
  ) { }

  // TODO: Cerrar sesión
  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login')
  }

  // TODO: Validamos token
  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/auth/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token),
        this.admin = resp.uid
      }),
      map(resp => true),
      catchError(error => of(false))
    );
  }

  // TODO: Crear Admin
  crearAdmin (formData: RegisterForm) {
    return this.http.post(`${base_url}/admin`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token)
      })
    )
  }

  // TODO: Iniciar sesión
  login (formData: LoginForm) {
    return this.http.post(`${base_url}/auth`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token)
      })
    )
  }

  // TODO: Obtener información del admin
  getAdmin() {
    const token = localStorage.getItem('token') || '';

    return this.http.get<AdminForm>(`${base_url}/admin/${this.admin}`, {
      headers: {
        'x-token': token
      }
    })
  }

  // TODO: Actualizar admin
  updateAdmin (changes: Partial<RegisterForm>) {
    const token = localStorage.getItem('token') || '';

    return this.http.put(`${base_url}/admin/${this.admin}`, changes, {
      headers: {
        'x-token': token
      }
    })
  }
}
