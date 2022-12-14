import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// SweetAlert2
import Swal from 'sweetalert2';
// PDFMake
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

// Date-fns
import { format } from 'date-fns';

// Formularios
import { AbstractControl, AbstractControlOptions, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

// Interfaces
import { ScheduleForm } from 'src/app/interfaces/schedules-form.interface';
import { ScheduleService } from 'src/app/services/schedule.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {

  // Atributos
  formSubmitted = false;
  studentForm!: FormGroup;
  horas: ScheduleForm[] = [];

  horarios: ScheduleForm[] = [];

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
    private scheduleService: ScheduleService,
    private studentService: StudentService
  ) { 
    this.buildForm();
  }

  ngOnInit(): void {
    this.obtenerHorarios();
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

    this.studentForm.get('codigo')?.setValue(codigo);
  }

  // TODO: Crear registro
  crearRegistro() {
    this.formSubmitted = true;
    this.generarCodigo(10);

    // Verificar que el formulario es correcto al crear
    if (this.studentForm.invalid) {
      return;
    }

    this.studentService.createStudent(this.studentForm.value)
    .subscribe({
      next: (resp) => {
        this.crearPDF();
        this.router.navigateByUrl('/admin/students');
      }, 
      error: (err) => Swal.fire('Error', err.error.msg, 'error')
    })
  }

  // TODO: Generar PDF
  crearPDF() {
    const valueForm = this.studentForm.value;

    const valueSchedule = this.horarios.filter(horario => horario.uid === valueForm.horario);

    // Fecha inicial
    let yearI = new Date(valueSchedule[0].fecha_inicial).getUTCFullYear();
    let monthI = new Date(valueSchedule[0].fecha_inicial).getUTCMonth();
    let dayI = new Date(valueSchedule[0].fecha_inicial).getUTCDate();
    // date-fns
    let fecha_inicial = format(new Date(yearI, monthI, dayI), 'dd/MM/yyyy');

    // Fecha final
    let yearF = new Date(valueSchedule[0].fecha_final).getUTCFullYear();
    let monthF = new Date(valueSchedule[0].fecha_final).getUTCMonth();
    let dayF = new Date(valueSchedule[0].fecha_final).getUTCDate();
    // date-fns
    let fecha_final = format(new Date(yearF, monthF, dayF), 'dd/MM/yyyy');

    const pdfDefinition: any = {
      content: [
        { text: 'Forcrack Perú', style: 'header', width: '100%' },
        { text: '_________________________________________________________', lineHeight: 2},
        {
          text: 'Información del registro',
          style: 'subheader1',
          alignment: 'center'
        },
        {
          text: '¡Felicidades! Ya estás registrad@ como alumno de nuestra institución deportiva',
          lineHeight: 2
        },
        {
          text: 'Toda información divulgada del documento no será responsabilidad de la academia',
          lineHeight: 2
        },
        {
          text: 'Información para el pago', 
          style: 'subheader2' 
        },
        {
          text: 'El costo de la matrícula es: S/ 80',
          lineHeight: 2
        },
        {
          text: 'El costo de los pagos mensuales es de: S/ 450',
          lineHeight: 2
        },
        {
          text: `Tu código para el pago es: ${valueForm.codigo}`,
          lineHeight: 2
        },
        {
          text: 'Depositar a esta cuenta:',
          lineHeight: 2
        },
        {
          style: 'tableExample',
          table: {
            body: [
              ['Nombre', 'N° de cuenta', 'CCI'],
              ['Forcrack', '205-16486468-1-25', '056454684646665']
            ]
          },
        },
        {
          text: ' '
        },
        {
          alignment: 'justify',
          columns: [
            { text: 'Información del horario', style: 'subheader2' },
            { text: 'Información del estudiante', style: 'subheader2' }
          ]
        },
        {
          alignment: 'justify',
          columns: [
            {
              ul: [
                `Nombre: ${valueSchedule[0].nombre}`,
                `Turno: ${valueSchedule[0].turno}`,
                `Edad mínima: ${valueSchedule[0].edad_min}`,
                `Edad máxima: ${valueSchedule[0].edad_max}`,
                `Hora: ${valueSchedule[0].hora_inicial} - ${valueSchedule[0].hora_final}`,
                `Fecha de inicio: ${fecha_inicial}`,
                `Fecha de fin: ${fecha_final}`,
              ],
              lineHeight: 2
            },
            {
              ul: [
                `Nombre: ${valueForm.nombre}`,
                `Apellido: ${valueForm.apellido}`,
                `Email: ${valueForm.email}`,
                `DNI: ${valueForm.dni}`,
                `Edad: ${valueForm.edad}`,
                `Celular: ${valueForm.celular}`,
              ],
              lineHeight: 2
            }
          ]
        }
      ],
      
      styles: {
        header: {
          fontSize: 22,
          bold: true,
        },
        subheader1: {
          fontSize: 18,
          bold: true,
          lineHeight: 2
        },
        subheader2: {
          fontSize: 14,
          bold: true,
          lineHeight: 2
        },
      }
    }

    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.download();
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

    // Si la cantidad de números  no es 8
    if (String(dni).length !== 8 && this.formSubmitted) return true;

    return false;
  }

  // TODO: Validando el DNI para el form
  validarDNI (dniValor: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const dniControl = formGroup.get(dniValor);

      if (String(dniControl?.value).length === 8) {
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

  // TODO: Validar pagos
  validarPagos (pay: string, value: string) {
    if (value === 'No Pagado') {
      return this.studentForm.get(pay)?.setValue(false);
    }

    return this.studentForm.get(pay)?.setValue(true);
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

  // TODO: Añadir la clase de active al contenedor de los select, cuando se le de click
  selectClick($event: Event) {
    // Horario
    let selectAge = document.querySelector('.form__admin-age');
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
    if (valorObject === selectAge) selectAge?.classList.toggle('active');
    if (valorObject === selectTurn) selectTurn?.classList.toggle('active');
    if (valorObject === selectHour) selectHour?.classList.toggle('active');

    if (valorObject === selectPayOne) selectPayOne?.classList.toggle('active');
    if (valorObject === selectPayTwo) selectPayTwo?.classList.toggle('active');
    if (valorObject === selectPayThree) selectPayThree?.classList.toggle('active');
    if (valorObject === selectPayFour) selectPayFour?.classList.toggle('active');
  }
}
