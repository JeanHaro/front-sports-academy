import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

// Interfaces
import { ContactForm } from '../interfaces/contact.interface';

// Environment
import { environment } from 'src/environments/environment';

// URL para peticiones
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor (private http: HttpClient) { }

  // TODO: Contactanos
  enviarContacto (formData: ContactForm) {
    return this.http.post(`${base_url}/contacto`, formData);
  }
}
