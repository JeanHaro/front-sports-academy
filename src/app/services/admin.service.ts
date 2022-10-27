import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

// Interfaces
import { RegisterForm } from '../interfaces/register-form.interface';

// Environment
import { environment } from 'src/environments/environment';

// URL para peticiones
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor (private http: HttpClient) { }

  // TODO: Crear Admin
  crearAdmin (formData: RegisterForm) {
    return this.http.post(`${base_url}/admin`, formData);
  }
}
