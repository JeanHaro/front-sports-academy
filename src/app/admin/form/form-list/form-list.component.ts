import { Component, OnInit } from '@angular/core';

// SweetAlert2
import Swal from 'sweetalert2';

// Interface
import { EnrollmentForm } from 'src/app/interfaces/enrollment-form.interface';

// Servicios
import { EnrollmentService } from 'src/app/services/enrollment.service';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss']
})
export class FormListComponent implements OnInit {

  // Variables
  matriculas: EnrollmentForm[] = [];

  constructor (private enrollmentService: EnrollmentService) { }

  ngOnInit(): void {
    this.obtenerMatriculas();
  }

  // TODO: Obtener Matriculas
  obtenerMatriculas() {
    this.enrollmentService.getAllSchedule()
    .subscribe({
      next: (items) => {
        let matriculas = Object.entries(items);
        this.matriculas = matriculas[1][1];

        // Guardamos valores en order
        for (let i = 0; i < this.matriculas.length; i++) {
          this.matriculas[i].order = i + 1;
        }
      },
      error: (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    })
  }

  // TODO: Eliminar Horario
  aceptarMatricula (id: string) {
    
  }


  // TODO: Eliminar Matricula
  eliminarMatricula (id: string) {
    this.enrollmentService.deleteEnrollment(id)
    .subscribe({
      next: (resp) => this.obtenerMatriculas(),
      error: (err) => Swal.fire('Error', err.error.msg, 'error')
    })
  }

}
