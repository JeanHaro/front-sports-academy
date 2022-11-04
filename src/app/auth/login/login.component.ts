import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
    private adminService: AdminService,
    private router: Router
  ) { }

  // TODO: Iniciar sesión
  login() {
    this.adminService.login(this.loginForm.value)
    .subscribe({
      next: (resp) => {
        this.router.navigateByUrl('/admin');
      },
      error: (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    })
  }
}
