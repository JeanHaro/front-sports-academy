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

  // TODO: Obtener registros
  getAllStudent() {
    const token = localStorage.getItem('token') || '';

    return this.http.get<StudentForm>(`${base_url}/registro`, {
      headers: {
        'x-token': token
      }
    });
  }

  // TODO: Obtener registro
  getStudent (id: string) {
    const token = localStorage.getItem('token') || '';

    return this.http.get<StudentForm>(`${base_url}/registro/${id}`, {
      headers: {
        'x-token': token
      }
    });
  }

  // TODO: Crear registro
  createStudent (formData: StudentForm) {
    const token = localStorage.getItem('token') || '';

    return this.http.post(`${base_url}/registro`, formData, {
      headers: {
        'x-token': token
      }
    })
  }

  // TODO: Actualizar registro
  updateStudent (id: string, formData: StudentForm) {
    const token = localStorage.getItem('token') || '';

    return this.http.put(`${base_url}/registro/${id}`, formData, {
      headers: {
        'x-token': token
      }
    })
  }

  // TODO: Eliminar registro
  deleteStudent (id: string) {
    const token = localStorage.getItem('token') || '';

    return this.http.delete(`${base_url}/registro/${id}`, {
      headers: {
        'x-token': token
      }
    })
  }
}
