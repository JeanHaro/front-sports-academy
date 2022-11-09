import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Fecha
import { format } from 'date-fns';

// SweetAlert2
import Swal from 'sweetalert2';

// Formularios
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Servicios
import { ScheduleService } from 'src/app/services/schedule.service';

// Interfaces
import { ScheduleForm } from 'src/app/interfaces/schedules-form.interface';

@Component({
  selector: 'app-schedule-edit',
  templateUrl: './schedule-edit.component.html',
  styleUrls: ['./schedule-edit.component.scss']
})
export class ScheduleEditComponent implements OnInit {
  // Variables
  formSubmitted = false;
  scheduleForm!: FormGroup;
  id!: string;
  horario!: ScheduleForm;
  todayDate = new Date().toISOString().split("T")[0];

  // Valores de horas y fechas
  horaInicial!: String;
  horaFinal!: String;
  fechaInicial!: String;
  fechaFinal!: String;

  // Valores de los select
  valores = {
    valueTurn: ''
  }

  constructor (
    private fb: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private scheduleService: ScheduleService
  ) { 
    this.buildForm();
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.obtenerHorario(this.id);
      // Obtener datos del horario
      this.scheduleService.getSchedule(this.id)
      .subscribe({
        next: (resp) => {
          this.scheduleForm.patchValue(resp);
        },
        error: (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        }
      })
    })
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

  // TODO: Datos al formulario
  dataForm() {
    this.scheduleForm = this.fb.group({
      nombre: [this.horario.nombre , Validators.required],
      cant_matriculas: [this.horario.cant_matriculas, Validators.required],
      turno: [this.valores.valueTurn, Validators.required],
      edad_min: [this.horario.edad_min, Validators.required],
      edad_max: [this.horario.edad_max, Validators.required],
      hora_inicial: [this.horario.hora_inicial, Validators.required],
      hora_final: [this.horario.hora_final, Validators.required],
      fecha_inicial: [this.fechaInicial, Validators.required],
      fecha_final: [this.fechaFinal, Validators.required]
    })
  }

  // TODO: Obtener los datos del backend
  obtenerHorario (id: string) {
    this.scheduleService.getSchedule(id)
    .subscribe({
      next: (horario) => {
        const valores = Object.entries(horario);
        this.horario = valores[1][1];

        // Guardando datos
        this.viewSelect(this.horario.turno);
        this.horaInicial = this.horario.hora_inicial;
        this.horaFinal = this.horario.hora_final;

        // Fecha inicial
        let yearS = new Date(this.horario.fecha_inicial).getUTCFullYear();
        let monthS = new Date(this.horario.fecha_inicial).getUTCMonth();
        let dayS = new Date(this.horario.fecha_inicial).getUTCDate();
        // date-fns
        this.fechaInicial = format(new Date(yearS, monthS, dayS), 'yyyy-MM-dd');
        
        // Fecha final
        let yearF = new Date(this.horario.fecha_final).getUTCFullYear();
        let monthF = new Date(this.horario.fecha_final).getUTCMonth();
        let dayF = new Date(this.horario.fecha_final).getUTCDate();
        // date-fns
        this.fechaFinal = format(new Date(yearF, monthF, dayF), 'yyyy-MM-dd');
        
        this.dataForm();
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

  // TODO: Actualizar horario
  actualizarHorario() {
    this.formSubmitted = true;
    console.log(this.scheduleForm.value);

    // Verificar que el formulario es correcto al crear
    if (this.scheduleForm.invalid) {
      return;
    }

    this.scheduleService.updateSchedule(this.id, this.scheduleForm.value)
    .subscribe((resp) => {
        this.router.navigate(['/admin/schedule']);
    })
  }

  // TODO: Entregará los valores que se seleccione en el select
  viewSelect (turn: string) {
    this.valores.valueTurn = turn;

    this.scheduleForm.get('turno')?.setValue(turn);

    let inputTurn = document.querySelector('.form__admin-turn input');

    // Si el valor no es vacío
    if (this.valores.valueTurn != '') inputTurn?.classList.add('border-orange');
  }

  // TODO: Añadir la clase de active al contenedor de los select, cuando se le de click
  selectClick($event: Event) {
    let selectTurn = document.querySelector('.form__admin-turn');
    
    selectTurn?.classList.toggle('active');
  }

}
