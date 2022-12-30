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
  // Variables
  public formSubmitted = false;
  time: any;

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

  // TODO: Abrir modal
  abrirModal() {
    let modal = document.getElementById('modal-auth');
    
    modal?.classList.remove('animate__bounceOutLeft');
    modal?.classList.remove('hidden');
    modal?.classList.add('animate__bounceInLeft');

    this.timer(60);
  }

  // TODO: Contador
  timer (value: number) {
    let timer = document.getElementById('count-code');

    timer!.innerHTML = `${value}`;

    if (value == 0) {
      alert('Tiempo concluido!');
    } else {
      value--;
      
      this.time = setTimeout(() => {
        this.timer(value)
      }, 1000);
    }
  }


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
