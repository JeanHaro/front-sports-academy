import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

// Formularios
import { AbstractControl, AbstractControlOptions, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// Interfaces
import { StudentForm } from 'src/app/interfaces/student-form.interface';
import { ScheduleForm } from 'src/app/interfaces/schedules-form.interface';

// Servicios
import { StudentService } from 'src/app/services/student.service';
import { format } from 'date-fns';
import { ScheduleService } from 'src/app/services/schedule.service';


@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.scss']
})
export class StudentEditComponent implements OnInit {

  // Atributos
  formSubmitted = false;
  studentForm!: FormGroup;
  id!: string;
  registro!: StudentForm;
  horas: ScheduleForm[] = [];
  horarios: ScheduleForm[] = [];
  horarioID!: string;

  // Valores de los select
  valores = {
    valueAge: '',
    valueTurn: '',
    valueHour: '',
    valuePayOne: 'No Pagado',
    valuePayTwo: 'No Pagado',
    valuePayThree: 'No Pagado',
    valuePayFour: 'No Pagado'
  }

  constructor (
    private fb: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private scheduleService: ScheduleService,
    private studentService: StudentService
  ) { 
    this.buildForm();
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.obtenerRegistro(this.id);
      this.obtenerHorarios();

      // Obtener datos del registro
      this.studentService.getStudent(this.id)
      .subscribe({
        next: (resp) => this.studentForm.patchValue(resp),
        error: (err) => Swal.fire('Error', err.error.msg, 'error')
      })
    })
  }

  // TODO: Validaciones propias
  formOptions: AbstractControlOptions = {
    validators: [
      this.validarDNI('dni'), 
      this.validarCelular('celular')
    ]
  }

  // TODO: Estructura y validación del formulario
  private buildForm() {
    this.studentForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', Validators.required],
      dni: ['', Validators.required],
      edad: ['', Validators.required],
      turno: ['', Validators.required],
      hora: ['', Validators.required],
      pago1: [false, Validators.required],
      pago2: [false, Validators.required],
      pago3: [false, Validators.required],
      pago4: [false, Validators.required],
      codigo: ['', Validators.required],
      horario: ['', Validators.required]
    }, this.formOptions)
  }

  // TODO: Datos del formulario
  dataForm() {
    this.studentForm = this.fb.group({
      nombre: [this.registro.nombre, Validators.required],
      apellido: [this.registro.apellido, Validators.required],
      email: [this.registro.email, [Validators.required, Validators.email]],
      celular: [this.registro.celular, Validators.required],
      dni: [this.registro.dni, Validators.required],
      edad: [this.registro.edad, Validators.required],
      turno: [this.valores.valueTurn, Validators.required],
      hora: [this.valores.valueHour, Validators.required],
      pago1: [this.registro.pago1, Validators.required],
      pago2: [this.registro.pago2, Validators.required],
      pago3: [this.registro.pago3, Validators.required],
      pago4: [this.registro.pago4, Validators.required],
      codigo: [this.registro.codigo, Validators.required],
      horario: [this.horarioID, Validators.required]
    }, this.formOptions)
  }

  // TODO: Obtener registro
  obtenerRegistro (id: string) {
    this.studentService.getStudent(id)
    .subscribe({
      next: (registro) => {
        const valores = Object.entries(registro);
        this.registro = valores[1][1];
        const { horario } = this.registro;

        this.horarioID = Object(horario)._id;
        const horarioTurno = Object(horario).turno;
        const horarioHora = `${Object(horario).hora_inicial + ' - ' + Object(horario).hora_final}`

        this.viewCategories(horarioTurno, horarioHora);

        this.verificarPago(this.registro.pago1, this.registro.pago2, this.registro.pago3, this.registro.pago4);

        this.dataForm();
      },
      error: (err) => Swal.fire('Error', err.error.msg, 'error')
    })
  }

  // TODO: Obtener horario
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
    let { edad, turno } = this.studentForm.value;
    
    // Fecha hoy
    let year = new Date().getFullYear();
    let month = new Date().getMonth();
    let day = new Date().getDate();
    // date-fns
    let today = format(new Date(year, month, day), 'yyyy-MM-dd');

    // Obtener datos del horario mediante la edad
    const hora_edad = this.horarios.filter(
      horario => {
        // Fecha inicial del horario
        let yearS = new Date(horario.fecha_inicial).getUTCFullYear();
        let monthS = new Date(horario.fecha_inicial).getUTCMonth();
        let dayS = new Date(horario.fecha_inicial).getUTCDate();
        // date-fns
        let fechaInicial = format(new Date(yearS, monthS, dayS), 'yyyy-MM-dd');

        if ( horario.cant_matriculas > 0 && fechaInicial >= today) {
          if (edad >= horario.edad_min && edad <= horario.edad_max) {
            
            return true;
          } 
        } 
        
        this.valores.valueHour = '';

        return false;
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

    this.studentForm.get('horario')?.setValue(uid);
  }

  // TODO: Si el campo no es valido
  campoNoValido (campo: string): boolean {
    // Si se envió y no es valido
    if (this.studentForm.get(campo)?.invalid && this.formSubmitted) return true;
    
    return false;
  }

  // TODO: Verificando el DNI para el template
  verificarDNI() {
    const dni = this.studentForm.get('dni')?.value;

    // Si la cantidad de números  no es 7
    if (String(dni).length !== 7 && this.formSubmitted) return true;

    return false;
  }

  // TODO: Validando el DNI para el form
  validarDNI (dniValor: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const dniControl = formGroup.get(dniValor);

      if (String(dniControl?.value).length === 7) {
        dniControl?.setErrors(null);
      } else {
        dniControl?.setErrors({ noEsDNI: true})
      }

      return null;
    }
  }

  // TODO: Verificando el n° celular para el template
  verificarCelular() {
    const celular = this.studentForm.get('celular')?.value;

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

  // TODO: Verificamos el pago para el template
  verificarPago (
    pay1: boolean | undefined, 
    pay2: boolean | undefined, 
    pay3: boolean | undefined, 
    pay4: boolean | undefined) {
      let pago1: string;
      let pago2: string;
      let pago3: string;
      let pago4: string;

      (pay1 === true) ? pago1 = "Pagado" : pago1 = "No Pagado";
      (pay2 === true) ? pago2 = "Pagado" : pago2 = "No Pagado";
      (pay3 === true) ? pago3 = "Pagado" : pago3 = "No Pagado";
      (pay4 === true) ? pago4 = "Pagado" : pago4 = "No Pagado";

      this.viewPay(pago1, pago2, pago3, pago4);
  }

  // TODO: Validar pagos
  validarPagos (pay: string, value: string) {
    if (value === 'No Pagado') {
      return this.studentForm.get(pay)?.setValue(false);
    }

    return this.studentForm.get(pay)?.setValue(true);
  }

  // TODO: Actualizar registro
  actualizarRegistro() {
    this.formSubmitted = true;
    console.log(this.studentForm.value);

    // Verificar que el formulario es correcto al crear
    if (this.studentForm.invalid) {
      return;
    }

    this.studentService.updateStudent(this.id, this.studentForm.value)
    .subscribe((resp) => {
        this.router.navigate(['/admin/students']);
    })
  }

  // Horario
  // TODO: Entregará los valores que se seleccione en el select
  viewCategories (
    turn: string = this.valores.valueTurn,
    hour: string = this.valores.valueHour
  ) {
    this.valores.valueTurn = turn;
    this.valores.valueHour = hour;

    // Envio el valor al formulario
    this.studentForm.get('turno')?.setValue(turn);
    this.studentForm.get('hora')?.setValue(hour);

    let inputTurn = document.querySelector('.form__admin-turn input');
    let inputHour = document.querySelector('.form__admin-hour input');

    // Si el valor no es vacío
    if (this.valores.valueTurn != '') inputTurn?.classList.add('border-orange');
    if (this.valores.valueHour != '') inputHour?.classList.add('border-orange');
  }
  
  // Pagos
  // TODO: Entregará los valores que se seleccione en el select
  viewPay (
    payOne: string = this.valores.valuePayOne, 
    payTwo: string = this.valores.valuePayTwo, 
    payThree: string = this.valores.valuePayThree, 
    payFour: string = this.valores.valuePayFour,
  ) {
    this.valores.valuePayOne = payOne;
    this.valores.valuePayTwo = payTwo;
    this.valores.valuePayThree = payThree;
    this.valores.valuePayFour = payFour;

    // Validar pagos
    this.validarPagos('pago1', payOne);
    this.validarPagos('pago2', payTwo);
    this.validarPagos('pago3', payThree);
    this.validarPagos('pago4', payFour);

    let inputPayOne = document.querySelector('.form__admin-payOne input');
    let inputPayTwo = document.querySelector('.form__admin-payTwo input');
    let inputPayThree = document.querySelector('.form__admin-payThree input');
    let inputPayFour = document.querySelector('.form__admin-payFour input');

    // Si el valor no es vacío
    if (this.valores.valuePayOne != '') inputPayOne?.classList.add('border-orange');
    if (this.valores.valuePayTwo != '') inputPayTwo?.classList.add('border-orange');
    if (this.valores.valuePayThree != '') inputPayThree?.classList.add('border-orange');
    if (this.valores.valuePayFour != '') inputPayFour?.classList.add('border-orange');
  }
  
    // Añadir la clase de active al contenedor de los select, cuando se le de click
  selectClick($event: Event) {
    // Horario
    let selectTurn = document.querySelector('.form__admin-turn');
    let selectHour = document.querySelector('.form__admin-hour');

    // Pagos
    let selectPayOne = document.querySelector('.form__admin-payOne');
    let selectPayTwo = document.querySelector('.form__admin-payTwo');
    let selectPayThree = document.querySelector('.form__admin-payThree');
    let selectPayFour = document.querySelector('.form__admin-payFour');

    // Etiqueta
    let valorObject = $event.currentTarget;
    // Si la etiqueta es igual al elemento
    if (valorObject === selectTurn) selectTurn?.classList.toggle('active');
    if (valorObject === selectHour) selectHour?.classList.toggle('active');

    if (valorObject === selectPayOne) selectPayOne?.classList.toggle('active');
    if (valorObject === selectPayTwo) selectPayTwo?.classList.toggle('active');
    if (valorObject === selectPayThree) selectPayThree?.classList.toggle('active');
    if (valorObject === selectPayFour) selectPayFour?.classList.toggle('active');
  }
}
