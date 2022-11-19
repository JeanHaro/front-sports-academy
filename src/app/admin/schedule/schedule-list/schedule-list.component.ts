import { Component, OnInit } from '@angular/core';

// SweetAlert2
import Swal from 'sweetalert2';

// Interfaces
import { ScheduleForm } from 'src/app/interfaces/schedules-form.interface';
import { StudentForm } from 'src/app/interfaces/student-form.interface';
import { EnrollmentForm } from 'src/app/interfaces/enrollment-form.interface';

// Servicios
import { ScheduleService } from 'src/app/services/schedule.service';
import { StudentService } from 'src/app/services/student.service';
import { EnrollmentService } from 'src/app/services/enrollment.service';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.scss']
})
export class ScheduleListComponent implements OnInit {

  // Variables
  horarios: ScheduleForm[] = [];
  matriculas: EnrollmentForm[] = [];
  registros: StudentForm[] = [];

  constructor (
    private scheduleService: ScheduleService,
    private studentService: StudentService,
    private enrollmentService: EnrollmentService
  ) { }

  ngOnInit(): void {
    this.obtenerHorarios();
    this.obtenerMatriculas();
    this.obtenerRegistros();
  }

  // TODO: Obtener Horarios
  obtenerHorarios() {
    this.scheduleService.getAllSchedule()
    .subscribe({
      next: (items) => {
        let valores = Object.entries(items);
        this.horarios = valores[1][1];

        // Guardamos valores en order
        for (let i = 0; i < this.horarios.length; i++) {
          this.horarios[i].order = i + 1;
        }
      },
      error: (err) => Swal.fire('Error', err.error.msg, 'error')
    })
  }

  // TODO: Eliminar Horario
  eliminarHorario (id: string) {
    // Obtener las matriculas con el id del horario
    let matricula = this.matriculas.filter(
      (item) => item.horario === id
    )

    for (let item of matricula) {
      this.eliminarMatriculas(item.uid);
    }

    // Obtener los registros con el id del horario
    let registro = this.registros.filter(
      (item) => item.horario === id
    )

    for (let item of registro) {
      this.eliminarRegistros(item.uid);
    }

    this.scheduleService.deleteSchedule(id)
    .subscribe({
      next: (resp) => {
        this.obtenerHorarios();
      },
      error: (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    })
  }

  // TODO: Obtener matriculas
  obtenerMatriculas() {
    this.enrollmentService.getAllEnrollment()
    .subscribe({
      next: (items) => {
        let valores = Object.entries(items);
        this.matriculas = valores[1][1];
      },
      error: (err) => Swal.fire('Error', err.error.msg, 'error')
    })
  }

  // TODO: Eliminar matriculas
  eliminarMatriculas (id: string) {
    this.enrollmentService.deleteEnrollment(id)
    .subscribe({
      next: (resp) => this.obtenerMatriculas(),
      error: (err) => Swal.fire('Error', err.error.msg, 'error')
    })
  }

  // TODO: Obtener registros
  obtenerRegistros() {
    this.studentService.getAllStudent()
    .subscribe({
      next: (items) => {
        let valores = Object.entries(items);
        this.registros = valores[1][1];
      },
      error: (err) => Swal.fire('Error', err.error.msg, 'error')
    })
  }

  // TODO: Eliminar registros
  eliminarRegistros (id: string) {
    this.studentService.deleteStudent(id)
    .subscribe({
      next: (resp) => this.obtenerRegistros(),
      error: (err) => Swal.fire('Error', err.error.msg, 'error')
    })
  }
}
