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

// Formulario
import { AbstractControl, AbstractControlOptions, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

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

  // TODO: Validaciones propias
  formOptions: AbstractControlOptions = {
    validators: [
      this.validarDNI('dni'), 
      this.validarCelular('celular')
    ]
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
    }, this.formOptions);
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
        this.crearPDF();
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

  // TODO: Generar PDF
  crearPDF() {
    const valueForm = this.enrollmentForm.value;

    const valueSchedule = this.horarios.filter(horario => horario.uid === valueForm.horario);

    // Fecha inicial
    let yearI = new Date(valueSchedule[0].fecha_inicial).getUTCFullYear();
    let monthI = new Date(valueSchedule[0].fecha_inicial).getUTCMonth();
    let dayI = new Date(valueSchedule[0].fecha_inicial).getUTCDate();
    // date-fns
    let fecha_inicial = format(new Date(yearI, monthI, dayI), 'dd/MM/yyyy');

    // Fecha final
    let yearF = new Date(valueSchedule[0].fecha_inicial).getUTCFullYear();
    let monthF = new Date(valueSchedule[0].fecha_inicial).getUTCMonth();
    let dayF = new Date(valueSchedule[0].fecha_inicial).getUTCDate();
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
    if (this.enrollmentForm.get(campo)?.invalid && this.formSubmitted) return true;
    
    return false;
  }

  // TODO: Verificando el DNI para el template
  verificarDNI() {
    const dni = this.enrollmentForm.get('dni')?.value;

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
    const celular = this.enrollmentForm.get('celular')?.value;

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
