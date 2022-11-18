import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

// SweetAlert2
import Swal from 'sweetalert2';

// FontAwesome
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

// Servicios
import { StudentService } from 'src/app/services/student.service';

// Interfaces
import { StudentForm } from 'src/app/interfaces/student-form.interface';

@Component({
  selector: 'app-students-unique',
  templateUrl: './students-unique.component.html',
  styleUrls: ['./students-unique.component.scss']
})
export class StudentsUniqueComponent implements OnInit {

  // Iconos
  faChevronLeft = faChevronLeft;

  // Atributos
  registros: StudentForm[] = [];
  registro: StudentForm[] = [];
  id!: string;

  constructor (
    private studentService: StudentService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.obtenerRegistros();
    })
  }

  // TODO: Obtener registros
  obtenerRegistros() {
    this.studentService.getAllStudent()
    .subscribe({
      next: (items) => {
        let registros = Object.entries(items);
        this.registros = registros[1][1];

        for (let i = 0; i < this.registros.length; i++) {
          this.registros[i].order = i + 1;
        }

        // TODO: Obtener registros por id del horario
        this.registros = this.registros.filter(items => items.horario == this.id);
      },
      error: (err) => Swal.fire('Error', err.error.msg, 'error')
    })
  }

  // TODO: Eliminar registro
  eliminarRegistro (id: string) {
    this.studentService.deleteStudent(id)
    .subscribe({
      next: (resp) => this.obtenerRegistros(),
      error: (err) => Swal.fire('Error', err.error.msg, 'error')
    })
  }

  toReturn() {
    history.go(-1);
  }
}
