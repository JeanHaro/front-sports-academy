import { Component, OnInit } from '@angular/core';

// Formulario
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

// SweetAlert2
import Swal from 'sweetalert2';

// Servicios
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public formSubmitted = false;

  // TODO: Validaciones del formulario
  public loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  constructor (
    private fb: FormBuilder,
    private adminService: AdminService
  ) { }

  // TODO: Iniciar sesión
  login() {
    this.adminService.login(this.loginForm.value)
    .subscribe({
      next: (resp) => {
        console.log(resp);
      },
      error: (err) => {
        Swal.fire({
          title: 'Error', 
          text: err.error.msg, 
          icon: 'error'
        })
      }
    })
  }
}
