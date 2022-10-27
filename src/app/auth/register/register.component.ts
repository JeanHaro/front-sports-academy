import { Component, OnInit } from '@angular/core';

// Fomrularios
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public formSubmitted = false;

  // TODO: Validaciones del formulario
  public registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  constructor (private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  // TODO: Crear admin
  crearAdmin() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    // Verificar que el formulario es correcto al crear
    if (this.registerForm.valid) {
      console.log('Posteando formulario');
    } else {
      console.log('Formulario no es correcto...');
    }
  }

  // TODO: Si el campo no es valido
  campoNoValido (campo: string): boolean {
    // Si se envió y no es valido
    if (this.registerForm.get(campo)?.invalid && this.formSubmitted) return true;
    
    return false;
  }
}
