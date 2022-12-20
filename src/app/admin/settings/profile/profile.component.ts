import { Component, OnInit } from '@angular/core';

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

  // Iconos
  faEnvelope = faEnvelope;
  faLock = faLock;

  constructor (
    private adminService: AdminService,
    private fb: FormBuilder
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.obtenerAdmin();
  }

  private buildForm() {
    this.adminForm = this.fb.group({
      email: [''],
      password_actual: [''],
      password_nueva: ['']
    })
  }

  dataForm() {
    this.adminForm = this.fb.group({
      email: [this.admin.email],
      password_actual: [''],
      password_nueva: ['']
    })
  }

  // TODO: Obtener admin
  obtenerAdmin() {
    this.adminService.getAdmin()
    .subscribe({
      next: (adm) => {
        const valor = Object.entries(adm);
        this.admin = valor[1][1];
        this.email = this.admin.email;

        this.dataForm();
      }
    })
  }

  // TODO: Actualizar Admin
  actualizarAdmin() {
    this.formSubmitted = true;
    console.log(this.adminForm.value);

    // Verificar que el formulario es correcto al crear
    if (this.adminForm.invalid) {
      return;
    }

    this.adminService.updateAdmin(this.adminForm.value)
    .subscribe({
      next: (resp) => {
        this.obtenerAdmin();
      }
    })
  }

}
