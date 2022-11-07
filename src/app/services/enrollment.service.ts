import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

// Interfaces
import { EnrollmentForm } from '../interfaces/enrollment-form.interface';

// Environment
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  constructor (private http: HttpClient) { }

  // TODO: Obtener todas las matrículas
  getAllSchedule() {
    const token = localStorage.getItem('token') || '';

    return this.http.get<EnrollmentForm>(`${base_url}/matricula`, {
      headers: {
        'x-token': token
      }
    });
  }

  // TODO: Crear horario
  createEnrollment (formData: EnrollmentForm) {
    return this.http.post(`${base_url}/matricula`, formData);
  }
}
