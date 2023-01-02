import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

// Formularios
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// SweetAlert2
import Swal from 'sweetalert2';

// Font Awesome
import { faXmark } from '@fortawesome/free-solid-svg-icons';

// Interfaces
import { AdminForm } from 'src/app/interfaces/admin-form.interface';

// Servicios
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.scss']
})
export class ModalLoginComponent implements OnChanges {

  // Variables
  @Input() tiempo: any;
  @Input() email!: string;
  @Input() password!: string;
  @Input() code!: boolean;
  loginForm!: FormGroup;
  codigo!: string;

  // Iconos
  faXmark = faXmark;

  constructor (
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router
  ) { 
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.password;
    this.dataForm();
  }

  // TODO: Estructura y validación del formulario
  private buildForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      codigo: ['', Validators.required]
    })
  }

  // TODO: Datos al formulario
  dataForm() {
    this.loginForm = this.fb.group({
      email: [this.email, [Validators.required, Validators.email]],
      password: [this.password, Validators.required],
      codigo: [this.codigo, Validators.required]
    })
  }

  // TODO: Cerrar modal
  cerrarModal() {
    let modal = document.getElementById('modal-auth');
    
    modal?.classList.add('animate__bounceOutLeft');
    modal?.classList.remove('animate__bounceInLeft');

    clearTimeout(this.tiempo);
  }

  // TODO: Contador
  timer (value: number) {
    clearTimeout(this.tiempo);

    let timer = document.getElementById('count-code');

    timer!.innerHTML = `${value}`;

    if (value == 0) {
      alert('Tiempo concluido!');
    } else {
      value--;

      this.tiempo = setTimeout(() => {
        this.timer(value)
      }, 1000);
    }
  }

  // TODO: Enviar código al correo
  sendCode (data: AdminForm) {
    this.adminService.sendCode(data)
    .subscribe({
      error: (err) => Swal.fire('Error', err.error.msg, 'error')
    })
  }

  // TODO: Reenviar código
  resendCode () {    
    return this.sendCode(this.loginForm.value)
  }

  // TODO: Obtener codigo
  obtenerCodigo (e: any) {
    this.codigo = e.target.value;
    this.dataForm();
  }

  // TODO: Iniciar sesión
  login() {    
    if (this.loginForm.invalid) return;

    if (this.code) {
      this.adminService.login(this.loginForm.value)
      .subscribe({
        next: (resp) => {
          clearTimeout(this.tiempo);
          this.router.navigateByUrl('/admin');
        },
        error: (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        }
      })
    }
  }
}
