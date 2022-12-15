import { Component } from '@angular/core';
import { Router } from '@angular/router';

// SweetAlert2
import Swal from 'sweetalert2';

// Formularios
import { AbstractControl, AbstractControlOptions, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

// Servicios
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})

export class ContactComponent {

  // Variables
  formSubmitted = false;
  contactForm!: FormGroup;

  // Valores del select
  valores = {
    valueAffairs: ''
  }

  constructor (
    private fb: FormBuilder,
    private contactService: ContactService,
    private router: Router
  ) { 
    this.buildForms();
  }

  // TODO: Validaciones propias
  formOptions: AbstractControlOptions = {
    validators: [
      this.validarCelular('celular')
    ]
  }

  // TODO: Estructura y validación de los formularios
  private buildForms() {
    this.contactForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', Validators.required],
      asunto: ['', Validators.required],
      mensaje: ['', Validators.required]
    }, this.formOptions)
  }

  // TODO: Si el campo no es valido
  campoNoValido (campo: string): boolean {
    // Si se envió y no es valido
    if (this.contactForm.get(campo)?.invalid && this.formSubmitted) return true;
    
    return false;
  }

  // TODO: Verificando el n° celular para el template
  verificarCelular() {
    const celular = this.contactForm.get('celular')?.value;

    // Si la cantidad de números  no es 7
    if (String(celular).length !== 9 && this.formSubmitted) return true;

    return false;
  }

  // TODO: Validando el DNI para el form
  validarCelular (celularValor: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const celularControl = formGroup.get(celularValor);

      if (String(celularControl?.value).length === 9) {
        celularControl?.setErrors(null);
      } else {
        celularControl?.setErrors({ noEsCelular: true})
      }

      return null;
    }
  }

  // TODO: Enviar contactanos
  enviarContactanos() {
    this.formSubmitted = true;

    // Verificar que el formulario es correcto al enviar
    if (this.contactForm.invalid) {
      return;
    }

    this.contactService.enviarContacto(this.contactForm.value)
    .subscribe({
      next: (resp) => {
        this.formSubmitted = false;
        this.contactForm.reset();
        this.router.navigateByUrl('/');

        Swal.fire('Correcto', 'Formulario enviado' , 'success');
      },
      error: (err) => {
        Swal.fire('Error', err.error.msg, 'error')
      }
    })
  }

  // Entregará los valores que se seleccione en el select
  viewSelect (affairs: string) {
    this.valores.valueAffairs = affairs;
    
    this.contactForm.get('asunto')?.setValue(affairs);
    
    let inputAffairs = document.querySelector('.contact__form-affair input');

    // Si el valor no es vacío
    if (this.valores.valueAffairs != '') inputAffairs?.classList.add('border-orange');
  }

  // Añadir la clase de active cuando se le de click
  selectClick ($event: Event) {
    let selectAffairs = document.querySelector('.contact__form-affair');

    // Etiqueta
    let valorObject = $event.currentTarget;
    // Si la etiqueta es igual al elemento
    if (valorObject === selectAffairs) selectAffairs?.classList.toggle('active');
  }

}
