import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

// SweetAlert2
import Swal from 'sweetalert2';

// Font Awesome
import { faXmark } from '@fortawesome/free-solid-svg-icons';

// Servicios
import { AdminService } from 'src/app/services/admin.service';

// Formularios
import { FormBuilder, FormGroup } from '@angular/forms';

// Interfaces
import { AdminForm } from 'src/app/interfaces/admin-form.interface';

@Component({
  selector: 'app-modal-password',
  templateUrl: './modal-password.component.html',
  styleUrls: ['./modal-password.component.scss']
})
export class ModalPasswordComponent implements OnInit, OnChanges {

  // Variables
  // Iconos
  faXmark = faXmark;
  @Input() codigo: boolean = false;

  admin!: AdminForm;
  formSubmitted = false;
  securityForm!: FormGroup;

  constructor (
    private adminService: AdminService,
    private fb: FormBuilder
  ) {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.obtenerAdmin();
  }

  ngOnInit(): void {
    this.obtenerAdmin();
  }

  // TODO: Cerrar modal
  cerrarModal() {
    let modal = document.getElementById('modal-pass');
    
    modal?.classList.add('animate__bounceOutLeft');
    modal?.classList.add('hidden');
    modal?.classList.remove('animate__bounceInLeft');
  }

  // TODO: Estructura y validación del formulario
  private buildForm() {
    this.securityForm = this.fb.group({
      email: [''],
      password: [''],
      password_nueva: [''],
      code: ['']
    })
  }

  // TODO: Datos al formulario
  dataForm() {
    this.securityForm = this.fb.group({
      email: [this.admin.email],
      password: [''],
      password_nueva: [''],
      code: [this.codigo]
    })
  }

  // TODO: Obtener admin
  obtenerAdmin() {
    this.adminService.getAdmin()
    .subscribe({
      next: (adm) => {
        const valor = Object.entries(adm);
        this.admin = valor[1][1];

        this.dataForm();
      }
    })
  }

  // TODO: Actualizar Admin
  actualizarSeguridad() {
    this.formSubmitted = true;

    // Verificar que el formulario es correcto al crear
    if (this.securityForm.invalid) {
      return;
    }

    this.adminService.updateAdmin(this.securityForm.value)
    .subscribe({
      next: (resp) => {
        this.cerrarModal();
        this.obtenerAdmin();
      },
      error: (err) => {
        Swal.fire('Error', err.error.msg, 'error')
      }
    })
  }
}
