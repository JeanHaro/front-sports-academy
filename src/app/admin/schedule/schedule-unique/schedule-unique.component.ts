import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

// SweetAlert2
import Swal from 'sweetalert2';

// FontAwesome
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

// Interfaces
import { ScheduleForm } from 'src/app/interfaces/schedules-form.interface';

// Servicios
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'app-schedule-unique',
  templateUrl: './schedule-unique.component.html',
  styleUrls: ['./schedule-unique.component.scss']
})
export class ScheduleUniqueComponent implements OnInit {

  // Iconos
  faChevronLeft = faChevronLeft;

  // Variables
  id!: string;
  horario!: ScheduleForm;
  
  constructor (
    private scheduleService: ScheduleService,
    private activeRoute: ActivatedRoute
  ) { 
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.obtenerHorario(this.id);
    })
  }

  // TODO: Obtener horario
  obtenerHorario (id: string) {
    this.scheduleService.getSchedule(id)
    .subscribe({
      next: (hor) => {
        const valores = Object.entries(hor);
        this.horario = valores[1][1];
      },
      error: (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    })
  }

  // TODO: Regresar a la página anterior
  toReturn() {
    history.go(-1);
  }
}
