import { Component, OnInit } from '@angular/core';

// Observables
import { Observable } from 'rxjs';

// Font Awesome
import { 
  faExclamation
} from '@fortawesome/free-solid-svg-icons';

// Interfaces
import { NotifyForm } from 'src/app/interfaces/notify.interface';

// Servicios
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.scss']
})
export class NotifyComponent implements OnInit {

  // Variables

  // Iconos
  faExclamation = faExclamation;

  // Variables - observable
  notificaciones$!: Observable<NotifyForm[]>;

  constructor (private notifyService: NotifyService) {
    this.notificaciones$ = this.notifyService.notify$;
  }

  ngOnInit(): void {
  }

}
