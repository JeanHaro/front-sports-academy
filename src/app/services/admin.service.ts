import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

// Rxjs
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

// Interfaces
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';

// Environment
import { environment } from 'src/environments/environment';

// URL para peticiones
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor (private http: HttpClient) { }

  // TODO: Validamos token
  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/auth/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token)
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
}
