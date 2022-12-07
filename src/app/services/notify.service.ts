import { Injectable } from '@angular/core';

// Reactivo
import { BehaviorSubject } from 'rxjs';

// Interfaces
import { NotifyForm } from '../interfaces/notify.interface';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  
  private elements: NotifyForm[] = [];

  private notify = new BehaviorSubject<NotifyForm[]>([]);

  // TODO: Tipo observable
  notify$ = this.notify.asObservable();

  constructor() { }

  // TODO: Agregar a las notificaciones
  addNotify (element: NotifyForm) {
    this.elements = [...this.elements, element];

    this.notify.next(this.elements);
  }
}
