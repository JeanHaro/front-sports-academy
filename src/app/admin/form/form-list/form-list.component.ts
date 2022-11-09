import { Component, OnInit } from '@angular/core';

// SweetAlert2
import Swal from 'sweetalert2';

// Interface
import { EnrollmentForm } from 'src/app/interfaces/enrollment-form.interface';
import { StudentForm } from 'src/app/interfaces/student-form.interface';

// Servicios
import { EnrollmentService } from 'src/app/services/enrollment.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss']
})
export class FormListComponent implements OnInit {

  // Variables
  matriculas: EnrollmentForm[] = [];
  matricula!: EnrollmentForm;

  constructor (
    private enrollmentService: EnrollmentService,
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    this.obtenerMatriculas();
  }

  // TODO: Obtener Matriculas
  obtenerMatriculas() {
    this.enrollmentService.getAllEnrollment()
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

  // TODO: Obtener los datos del backend
  obtenerMatricula (id: string) {
    this.enrollmentService.getEnrollment(id)
    .subscribe({
      next: (matric) => {
        const valor = Object.entries(matric);
        this.matricula = valor[1][1];

        this.enviarRegistro(this.matricula);
      },
      error: (err) => {
        console.log(err);
        Swal.fire('Error', err.error.msg, 'error');
      }
    });
  }

  // TODO: Aceptar Matrícula (Eliminar matrícula y Crear registro)
  aceptarMatricula (id: string) {
    this.enrollmentService.getEnrollment(id)
    .subscribe({
      next: (matric) => {
        const valor = Object.entries(matric);
        this.matricula = valor[1][1];

        const { horario, matricula, ...campos } = this.matricula;

        const horarioID = Object(this.matricula.horario)._id;

        let res: EnrollmentForm = { 
          horario: horarioID, 
          matricula: true,
          ...campos 
        };

        this.enviarRegistro(res);
      },
      error: (err) => {
        console.log(err);
        Swal.fire('Error', err.error.msg, 'error');
      }
    });

    this.eliminarMatricula(id);
  }

  // TODO: Mandar registro
  enviarRegistro (student: StudentForm) {
    this.studentService.createStudent(student)
    .subscribe({
      next: (resp) => {
        Swal.fire('Aceptado', 'Alumno registrado', 'success');
      },
      error: (err) => {
        Swal.fire('Aceptado', err.error.msg, 'success');
      }
    })
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
