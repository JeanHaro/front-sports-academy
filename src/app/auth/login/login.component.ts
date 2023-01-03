import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Formulario
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

// SweetAlert2
import Swal from 'sweetalert2';

// Interfaces
import { AdminForm } from 'src/app/interfaces/admin-form.interface';
import { LoginForm } from 'src/app/interfaces/login-form.interface';

// Servicios
import { AdminService } from 'src/app/services/admin.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // Variables
  public formSubmitted = false;
  code: boolean = false;
  time: any;
  email!: string;
  password!: string;
  admin: AdminForm[] = [];

  constructor (
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerAdmins();
  }

  // TODO: Validaciones del formulario
  public loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  // TODO: Obtener email
  obtenerEmail (e: any) {
    this.email = e.target.value;

    this.obtenerCodigo();
  }

  // TODO: Obtener password
  obtenerPass (e: any) {
    this.password = e.target.value;
  }

  // TODO: Abrir modal
  abrirModal() {
    let modal = document.getElementById('modal-auth');
    
    modal?.classList.remove('animate__bounceOutLeft');
    modal?.classList.remove('hidden');
    modal?.classList.add('animate__bounceInLeft');

    clearTimeout(this.time);
    this.timer(60);
  }

  // TODO: Contador
  timer (value: number) {
    let timer = document.getElementById('count-code');

    timer!.innerHTML = `${value}`;

    if (value == 0) {
      Swal.fire('¡Aviso!', 'Tiempo concluido', 'warning');
    } else {
      value--;

      this.time = setTimeout(() => {
        this.timer(value)
      }, 1000);
    }
  }

  // TODO: Obtener todos los admin
  obtenerAdmins() {
    this.adminService.getAllAdmin()
    .subscribe({
      next: (resp) => {
        let valor = Object.entries(resp);
        this.admin = valor[1][1];
      }
    })
  }

  // TODO: Obtener booleano del código
  obtenerCodigo() {
    let log = this.admin.filter(items => (items.email === this.email))

    if (log.length === 1) return this.code = log[0].code;

    return this.code = false;
  }

  // TODO: Enviar código al correo
  sendCode (data: AdminForm) {
    this.adminService.sendCode(data)
    .subscribe({
      error: (err) => Swal.fire('Error', err.error.msg, 'error')
    })
  }

  // TODO: Iniciar sesión
  login() {
    if (this.loginForm.invalid) return;

    if (this.code) {
      this.abrirModal();

      this.sendCode(this.loginForm.value);
    }

    if (!this.code) {
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
}
