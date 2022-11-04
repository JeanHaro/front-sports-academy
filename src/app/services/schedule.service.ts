import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

// Interfaces
import { ScheduleForm } from '../interfaces/schedules-form.interface';

// Environment
import { environment } from 'src/environments/environment';

// URL para peticiones
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor (
    private http: HttpClient
  ) { }

  // TODO: Obtener todos los horarios
  getAllSchedule() {
    const token = localStorage.getItem('token') || '';

    return this.http.get<ScheduleForm>(`${base_url}/horario`, {
      headers: {
        'x-token': token
      }
    })
  }

  // TODO: Obtener horario
  getSchedule (id: string) {
    const token = localStorage.getItem('token') || '';
    
    return this.http.get<ScheduleForm>(`${base_url}/horario/${id}`, {
      headers: {
        'x-token': token
      }
    })
  }

  // TODO: Crear horario
  createSchedule (formData: ScheduleForm) {
    const token = localStorage.getItem('token') || '';

    return this.http.post(`${base_url}/horario`, formData, {
      headers: {
        'x-token': token
      }
    });
  }

  // TODO: Actualizar horario
  updateSchedule (id: string, changes: Partial<ScheduleForm>) {
    const token = localStorage.getItem('token') || '';

    return this.http.put(`${base_url}/horario/${id}`, changes, {
      headers: {
        'x-token': token
      }
    });
  }

  // TODO: Eliminar horario
  deleteSchedule (id: string) {
    const token = localStorage.getItem('token') || '';

    return this.http.delete(`${base_url}/horario/${id}`, {
      headers: {
        'x-token': token
      }
    })
  }
}
