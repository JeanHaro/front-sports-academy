import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// SweetAlert2
import Swal from 'sweetalert2';

// Formulario
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Interfaces
import { ScheduleForm } from 'src/app/interfaces/schedules-form.interface';

// Servicios
import { ScheduleService } from 'src/app/services/schedule.service';
import { EnrollmentService } from 'src/app/services/enrollment.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  // Variables
  formSubmitted = false;
  enrollmentForm!: FormGroup;
  horas: ScheduleForm[] = [];

  horarios: ScheduleForm[] = [];

  // Valores de los select
  valores = {
    valueTurn: '',
    valueHour: '',
  }

  constructor (
    private fb: FormBuilder,
    private router: Router,
    private scheduleService: ScheduleService,
    private enrollmentService: EnrollmentService
  ) { 
    this.buildForm();
  }

  ngOnInit(): void {
    this.obtenerHorarios();
  }

  // TODO: Estructura y validación del formulario
  private buildForm() {
    this.enrollmentForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', Validators.required],
      dni: ['', Validators.required],
      edad: ['', Validators.required],
      turno: ['', Validators.required],
      hora: ['', Validators.required],
      codigo: ['', Validators.required],
      horario: ['', Validators.required],
    })
  }

  // TODO: Obtener horarios
  obtenerHorarios() {
    this.scheduleService.getAllSchedule()
    .subscribe({
      next: (items) => {
        let horarios = Object.entries(items);
        this.horarios = horarios[1][1];

        // Guardamos valores en order
        for (let i = 0; i < this.horarios.length; i++) {
          this.horarios[i].order = i + 1;
        }
      },
      error: (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    })
  }

  // TODO: Obtener hora del horario
  obtenerHora() {
    let { edad, turno } = this.enrollmentForm.value;
    
    // Obtener datos del horario mediante la edad
    const hora_edad = this.horarios.filter(
      horario => {
        if (edad >= horario.edad_min && edad <= horario.edad_max) {
          return true;
        } else {
          this.valores.valueHour = '';

          return false;
        }
      }
    )

    // Obtener datos del horario mediante el turno
    this.horas = hora_edad.filter(
      horario => (turno === horario.turno)
    )
  }

  // TODO: Obtener id del horario
  obtenerID() {
    const horarioID = this.horas.filter(
      valor => (`${valor.hora_inicial} - ${valor.hora_final}` === this.valores.valueHour)
    );
    
    let uid = horarioID[0].uid;

    this.enrollmentForm.get('horario')?.setValue(uid);
  }

  // TODO: Generar código
  generarCodigo (longitud: number) {
    let numeros = '0123456789';
    let letras = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let numeros_letras = numeros + letras;

    let codigo = "";

    for (let i = 0; i < longitud; i++) {
      let aleatorio = Math.floor(Math.random() * numeros_letras.length);
      codigo += numeros_letras.charAt(aleatorio);
    }

    this.enrollmentForm.get('codigo')?.setValue(codigo);
  }

  // TODO: Crear matricula
  crearMatricula() {
    this.formSubmitted = true;
    
    this.generarCodigo(10);

    // Verificar que el formulario es correcto al crear
    if (this.enrollmentForm.invalid) {
      return;
    }

    this.enrollmentService.createEnrollment(this.enrollmentForm.value)
    .subscribe({
      next: (resp) => {
        this.formSubmitted = false;
        this.enrollmentForm.reset();
        this.router.navigateByUrl('/form');

        Swal.fire('Correcto', 'Formulario enviado' , 'success');
      },
      error: (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    })
  }

  // TODO: Si el campo no es valido
  campoNoValido (campo: string): boolean {
    // Si se envió y no es valido
    if (this.enrollmentForm.get(campo)?.invalid && this.formSubmitted) return true;
    
    return false;
  }

  // TODO: Entregará los valores que se seleccione en el select
  viewSelect (turn: string, hour: string) {
    this.valores.valueTurn = turn;
    this.valores.valueHour = hour;

    // Envio el valor al formulario
    this.enrollmentForm.get('turno')?.setValue(turn);
    this.enrollmentForm.get('hora')?.setValue(hour);

    let inputTurn = document.querySelector('.form__register-turn input');
    let inputHour = document.querySelector('.form__register-hour input');

    // TODO: Si el valor no es vacío
    if (this.valores.valueTurn != '') inputTurn?.classList.add('border-orange');
    if (this.valores.valueHour != '') inputHour?.classList.add('border-orange');
  }

  // TODO: Añadir la clase de active al contenedor de los select, cuando se le de click
  selectClick($event: Event) {
    let selectTurn = document.querySelector('.form__register-turn');
    let selectHour = document.querySelector('.form__register-hour');
    
    // Etiqueta
    let valorObject = $event.currentTarget;
    // Si la etiqueta es igual al elemento
    if (valorObject === selectTurn) selectTurn?.classList.toggle('active');
    if (valorObject === selectHour) selectHour?.classList.toggle('active');
  }
}
