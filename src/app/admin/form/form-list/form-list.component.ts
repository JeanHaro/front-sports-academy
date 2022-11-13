import { Component, OnInit } from '@angular/core';

// SweetAlert2
import Swal from 'sweetalert2';

// Date-fns
import { format } from 'date-fns';

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

          this.finMatricula(this.matriculas[i].uid);
        }
      },
      error: (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    })
  }

  // TODO: Aceptar Matrícula (Eliminar matrícula y Crear registro)
  aceptarMatricula (id: string) {
    this.enrollmentService.getEnrollment(id)
    .subscribe({
      next: (matric) => {
        const valor = Object.entries(matric);
        this.matricula = valor[1][1];

        const { horario, matricula, ...campos } = this.matricula;

        const horarioID = Object(horario)._id;

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

  // TODO: Eliminar matricula si el inicio del horario ya empezó
  finMatricula (id: string) {
    // Fecha hoy
    let year = new Date().getFullYear();
    let month = new Date().getMonth();
    let day = new Date().getDate();
    // date-fns
    let today = format(new Date(year, month, day), 'yyyy-MM-dd');

    this.enrollmentService.getEnrollment(id)
    .subscribe({
      next: (matric) => {
        const valor = Object.entries(matric);
        this.matricula = valor[1][1];

        let inicio = Object(this.matricula.horario).fecha_inicial;

        // Fecha inicio
        let yearS = new Date(inicio).getUTCFullYear();
        let monthS = new Date(inicio).getUTCMonth();
        let dayS = new Date(inicio).getUTCDate();
        // date-fns
        let fecha_inicio = format(new Date(yearS, monthS, dayS), 'yyyy-MM-dd');

        // Si fecha inicio es menor a la fecha de hoy
        if (fecha_inicio < today) {
          this.eliminarMatricula(id);
        }
      },
      error: (err) => {
        console.log(err);
        Swal.fire('Error', err.error.msg, 'error');
      }
    });
  }
}
