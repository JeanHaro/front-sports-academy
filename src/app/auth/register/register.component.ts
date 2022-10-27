import { Component, OnInit } from '@angular/core';

// Fomrularios
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // Validaciones del formulario
  public registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  constructor (private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  crearAdmin() {
    console.log(this.registerForm.value);
  }
}
