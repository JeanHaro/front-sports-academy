import { Component, OnInit } from '@angular/core';

// SweetAlert2
import Swal from 'sweetalert2';

// Interfaces
import { ScheduleForm } from 'src/app/interfaces/schedules-form.interface';

// Servicios
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.scss']
})
export class ScheduleListComponent implements OnInit {

  // Variables
  horarios: ScheduleForm[] = [];

  constructor (private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.obtenerHorarios();
  }

  // TODO: Obtener Horarios
  obtenerHorarios() {
    this.scheduleService.getAllSchedule()
    .subscribe({
      next: (items) => {
        let horarios = Object.entries(items);
        this.horarios = horarios[1][1];

        // Guardamos valores en order
        for (let i = 0; i < this.horarios.length; i++) {
          this.horarios[i].order = i + 1;
        }
      },
      error: (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    })
  }
}
