import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

// Interfaces
import { StudentForm } from '../interfaces/student-form.interface';

// Environment
import { environment } from 'src/environments/environment';

// URL de peticiones
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor (private http: HttpClient) { }

  // TODO: Crear registro
  createStudent (formData: StudentForm) {
    const token = localStorage.getItem('token') || '';

    return this.http.post(`${base_url}/registro`, formData, {
      headers: {
        'x-token': token
      }
    })
  }
}
