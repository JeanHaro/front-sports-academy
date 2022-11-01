import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Fecha
import { formatDate } from '@angular/common';

// SweetAlert2
import Swal from 'sweetalert2';

// Formularios
import { AbstractControl, AbstractControlOptions, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

// Servicios
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.scss']
})
export class ScheduleFormComponent {

  // Variables
  formSubmitted = false;
  scheduleForm!: FormGroup;
  todayDate = new Date().toISOString().split("T")[0];
  minTime = '08:00';
  maxTime = '21:00';

  // Valores de los select
  valores = {
    valueTurn: ''
  }

  constructor (
    private fb: FormBuilder,
    private router: Router,
    private scheduleService: ScheduleService
  ) { 
    this.buildForm();
  }

  // TODO: Obtener y mandar el valor de las horas
  timeValue (event: any) {
    let time = event.target.value;

    if (event.target.name === 'hour-start') {
      return this.scheduleForm.get('hora_inicial')?.setValue(time);
    }

    return this.scheduleForm.get('hora_final')?.setValue(time);
  }

  // TODO: Obtener y mandar fechas
  dateValue (event: any) {
    let fecha = event.target.value;
    // let formatoFecha = formatDate(fecha, 'dd-MM-yyyy', 'en');

    if (event.target.name === 'date-start') {
      return this.scheduleForm.get('fecha_inicial')?.setValue(fecha);
    }
    
    return this.scheduleForm.get('fecha_final')?.setValue(fecha);
  }

  // TODO: Estructura y validación del formulario
  private buildForm() {
    this.scheduleForm = this.fb.group({
      nombre: ['', Validators.required],
      cant_matriculas: ['', Validators.required],
      turno: ['', Validators.required],
      edad_min: ['', Validators.required],
      edad_max: ['', Validators.required],
      hora_inicial: ['', Validators.required],
      hora_final: ['', Validators.required],
      fecha_inicial: ['', Validators.required],
      fecha_final: ['', Validators.required]
    })
  }
  

  // TODO: Crear horario
  createSchedule() {
    this.formSubmitted = true;

    // Verificar que el formulario es correcto al crear
    if (this.scheduleForm.invalid) {
      return;
    }

    this.scheduleService.crearHorario(this.scheduleForm.value)
    .subscribe({
      next: (resp) => {
        this.router.navigateByUrl('/admin/schedule');
      },
      error: (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    })
  }

  // TODO: Si el campo no es valido
  campoNoValido (campo: string): boolean {
    // Si se envió y no es valido
    if (this.scheduleForm.get(campo)?.invalid && this.formSubmitted) return true;
    
    return false;
  }

  // TODO: Entregará los valores que se seleccione en el select
  viewSelect (turn: string) {
    this.valores.valueTurn = turn;
  
    // Envio el valor al formulario
    this.scheduleForm.get('turno')?.setValue(turn);

    let inputTurn = document.querySelector('.form__admin-turn input');

    // Si el valor no es vacío
    if (this.valores.valueTurn != '') inputTurn?.classList.add('border-orange');
  }

  // TODO: Añadir la clase de active al contenedor de los select, cuando se le de click
  selectClick ($event: Event) {
    let selectTurn = document.querySelector('.form__admin-turn');
    
    selectTurn?.classList.toggle('active');
  }
}
