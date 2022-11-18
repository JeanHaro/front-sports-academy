import { Component, OnInit } from '@angular/core';

// SweetAlert2
import Swal from 'sweetalert2';

// Interfaces
import { StudentForm } from 'src/app/interfaces/student-form.interface';

// Servicio
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit {

  // Atributos
  registros: StudentForm[] = [];

  constructor (
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    this.obtenerRegistros();
  }

  // TODO: Obtener Registros
  obtenerRegistros() {
    this.studentService.getAllStudent()
    .subscribe({
      next: (items) => {
        let registros = Object.entries(items);
        this.registros = registros[1][1];

        for (let i = 0; i < this.registros.length; i++) {
          this.registros[i].order = i + 1;
        }
      },
      error: (err) => Swal.fire('Error', err.error.msg, 'error')
    })
  }

  // TODO: Eliminar Registro
  eliminarRegistro (id: string) {
    this.studentService.deleteStudent(id)
    .subscribe({
      next: (resp) => this.obtenerRegistros(),
      error: (err) => Swal.fire('Error', err.error.msg, 'error')
    })
  }
}
