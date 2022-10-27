import { Component } from '@angular/core';

// Fomrularios
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

// Servicios
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public formSubmitted = false;

  // TODO: Validaciones del formulario
  public registerForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  constructor (
    private fb: FormBuilder,
    private adminService: AdminService
  ) { }

  // TODO: Crear admin
  crearAdmin() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    // Verificar que el formulario es correcto al crear
    if (this.registerForm.invalid) {
      return;
    }
    
    // TODO: Creación del admin
    this.adminService.crearAdmin(this.registerForm.value)
    .subscribe({
      next: (resp) => {
        console.log('Admin creado');
        console.log(resp);
      },
      error: (err) => console.warn(err.error.msg)
    })
  }

  // TODO: Si el campo no es valido
  campoNoValido (campo: string): boolean {
    // Si se envió y no es valido
    if (this.registerForm.get(campo)?.invalid && this.formSubmitted) return true;
    
    return false;
  }
}
