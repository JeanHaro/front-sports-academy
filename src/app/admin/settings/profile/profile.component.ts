import { Component, OnInit } from '@angular/core';

// SweetAlert2
import Swal from 'sweetalert2';

// Formularios
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Font Awesome
import { 
  faEnvelope,
  faLock
} from '@fortawesome/free-solid-svg-icons';

// Interfaces
import { AdminForm } from 'src/app/interfaces/admin-form.interface';

// Servicios
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  // Variables
  admin!: AdminForm;
  email!: string;
  formSubmitted = false;
  adminForm!: FormGroup;

  /* formPassSubmitted = false;
  adminPassForm!: FormGroup; */

  // Iconos
  faEnvelope = faEnvelope;
  faLock = faLock;

  constructor (
    private adminService: AdminService,
    private fb: FormBuilder
  ) {
    this.buildForm();
    // this.buildPassForm();
  }

  ngOnInit(): void {
    this.obtenerAdmin();
  }

  // TODO: Estructura y validación del formulario
  private buildForm() {
    this.adminForm = this.fb.group({
      email: [''],
      password: [''],
      password_nueva: ['']
    })
  }

  // TODO: Estructura y validación del formulario
  /* private buildPassForm() {
    this.adminPassForm = this.fb.group({
      email: [''],
      password: [''],
      password_nueva: ['']
    })
  } */

  // TODO: Datos al formulario
  dataForm() {
    this.adminForm = this.fb.group({
      email: [this.admin.email],
      password: [''],
      password_nueva: ['']
    })
  }

  /* dataPassForm() {
    this.adminForm = this.fb.group({
      email: [this.admin.email],
      password: [''],
      password_nueva: ['']
    })
  } */

  // TODO: Obtener admin
  obtenerAdmin() {
    this.adminService.getAdmin()
    .subscribe({
      next: (adm) => {
        const valor = Object.entries(adm);
        this.admin = valor[1][1];
        this.email = this.admin.email;

        this.dataForm();
        // this.dataPassForm();
      }
    })
  }

  // TODO: Actualizar Email del Admin
  actualizarAdmin() {
    this.formSubmitted = true;

    // Verificar que el formulario es correcto al crear
    if (this.adminForm.invalid) {
      return;
    }

    this.adminService.updateAdmin(this.adminForm.value)
    .subscribe({
      next: (resp) => {
        this.obtenerAdmin();
      },
      error: (err) => {
        Swal.fire('Error', err.error.msg, 'error')
      }
    })
  }

  // TODO: Actualizar Password del Admin
  /* actualizarPassAdmin() {
    this.formPassSubmitted = true;

    // Verificar que el formulario es correcto al crear
    if (this.adminPassForm.invalid) {
      return;
    }

    this.adminService.updateAdmin(this.adminPassForm.value)
    .subscribe({
      next: (resp) => {
        this.obtenerAdmin();
      },
      error: (err) => {
        Swal.fire('Error', err.error.msg, 'error')
      }
    })
  } */
}
