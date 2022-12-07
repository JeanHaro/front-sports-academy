import { Component } from '@angular/core';

// Observaciones
import { Observable } from 'rxjs';

// SweetAlert2
import Swal from 'sweetalert2';

// Font Awesome
import { 
  faCalendarDays,
  faChevronDown,
  faListCheck,
  faUser,
  faRightFromBracket,
  faBell,
  faExclamation,
  faCircleExclamation
} from '@fortawesome/free-solid-svg-icons';

// Interfaces
import { EnrollmentForm } from 'src/app/interfaces/enrollment-form.interface';
import { StudentForm } from 'src/app/interfaces/student-form.interface';
import { NotifyForm } from 'src/app/interfaces/notify.interface';

// Servicios
import { AdminService } from 'src/app/services/admin.service';
import { NotifyService } from 'src/app/services/notify.service';
import { EnrollmentService } from 'src/app/services/enrollment.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  // Variables 
  matriculas: EnrollmentForm[] = [];
  matricula!: EnrollmentForm;
  registros: StudentForm[] = [];
  registro!: StudentForm;

  // Iconos
  faCalendarDays = faCalendarDays;
  faChevronDown = faChevronDown;
  faListCheck = faListCheck;
  faUser = faUser;
  faRightFromBracket = faRightFromBracket;
  faBell = faBell;
  faCircleExclamation = faCircleExclamation;
  faExclamation = faExclamation;

  // Variables - observable
  notificaciones$!: Observable<NotifyForm[]>;

  constructor (
    private adminService: AdminService,
    private enrollmentService: EnrollmentService,
    private studentService: StudentService,
    private notifyService: NotifyService
  ) {
    this.notificaciones$ = this.notifyService.notify$;
    console.log(this.notificaciones$);
  }

  ngOnInit(): void {
    this.obtenerMatriculas();
    this.obtenerRegistros();
  }

  // TODO: Datos de las notificaciones con el tiempo
  notifyData (inicio: Date, element: EnrollmentForm | StudentForm, tipo: string) {
    // Fecha hoy
    let year = new Date().getFullYear();
    let month = new Date().getMonth();
    let today = new Date();
    // Tiempo en milisegundos
    let today_time = today.getTime();

    // Formulas para hallar milisegundos, minutos, horas y días
    let diaMilisegundos = 24 * 60 * 60 * 1000;
    let mili_minutos = 1000 * 60;
    let minu_horas = mili_minutos * 60;
    let hora_dias = minu_horas * 24;

    // Año, mes y día de la fecha inicial
    let yearS = new Date(inicio).getUTCFullYear();
    let dayS = new Date(inicio).getUTCDate();

     // Meses de pago
    let monthSOne = new Date(inicio).getUTCMonth();
    let monthSTwo = new Date(inicio).getUTCMonth() + 1;
    let monthSThree = new Date(inicio).getUTCMonth() + 2;
    let monthSFour = new Date(inicio).getUTCMonth() + 3;

    // Fecha inicial
    let fecha_inicio = new Date(yearS, monthSOne, dayS);

    // Ayer de la fecha inicial
    let fecha_ayer = new Date(fecha_inicio.getTime() - diaMilisegundos);
    // Mañana de la fecha inicial
    let fecha_mañana = new Date(fecha_inicio.getTime() + diaMilisegundos);

    // Fecha de pago
    let fecha_pago = new Date(year, month, fecha_inicio.getDate());

    // Ayer de la fecha de pago
    let fechas_pago_ayer = new Date(year, month, fecha_ayer.getDate());
    // Tiempo en milisegundos
    let fechas_ayer_time = fechas_pago_ayer.getTime();
    
    // Mañana de la fecha de pago
    let fechas_pago_mañana = new Date(year, month, fecha_mañana.getDate());
    // Tiempo en milisegundos
    let fechas_mañana_time = fechas_pago_mañana.getTime();

    // Luego del día de pago, en milisegundos
    let intervalAfter = today_time - fechas_mañana_time;

    // Días que pasaron
    let dayAfter = Math.floor(intervalAfter / hora_dias);
    intervalAfter = intervalAfter - (dayAfter * hora_dias);

    // Horas que pasaron
    let hourAfter = Math.floor(intervalAfter / minu_horas );
    intervalAfter = intervalAfter - (hourAfter * minu_horas);

    // Minutos que pasaron
    let minutesAfter = Math.floor(intervalAfter / mili_minutos );
    intervalAfter = intervalAfter - (minutesAfter * mili_minutos );

    // Segundos que pasaron
    let secondsAfter = Math.floor(intervalAfter / 1000 );

    // Antes del dia de pago, en milisegundos
    let intervalBefore = fechas_mañana_time - today_time;
  
    // Dias que faltan
    let dayBefore = Math.floor(intervalBefore / hora_dias);
    intervalBefore = intervalBefore - (dayBefore * hora_dias);

    // Horas que faltan
    let hourBefore = Math.floor(intervalBefore / minu_horas );
    intervalBefore = intervalBefore - (hourBefore * minu_horas);

    // Minutos que faltan
    let minutesBefore = Math.floor(intervalBefore / mili_minutos );
    intervalBefore = intervalBefore - (minutesBefore * mili_minutos );

    // Segundos que faltan
    let secondsBefore = Math.floor(intervalBefore / 1000 );

    const { ...campos } = element;

    let res: NotifyForm = {
      ...campos,
      fecha_inicio: fecha_inicio,
      fecha_pago: fecha_pago,
      diasA: dayBefore,
      horasA: hourBefore,
      minutosA: minutesBefore,
      segundosA: secondsBefore,
      diasD: dayAfter,
      horasD: hourAfter,
      minutosD: minutesAfter,
      segundosD: secondsAfter,
      tipo: tipo
    }

    // Matricula
    if (tipo === 'matricula') {
      if (today_time >= fechas_ayer_time) {
        this.notifyService.addNotify(res);
      }
    }
    
    // Registro
    if (tipo === 'registro') {
      // Pago 1
      if (month === monthSOne) {
        if (today_time >= fechas_ayer_time && !this.registro.pago1) this.notifyService.addNotify(res);
      }

      // Pago 2
      if (month === monthSTwo) {
        if (today_time >= fechas_ayer_time && !this.registro.pago2) this.notifyService.addNotify(res);
      }

      // Pago 3
      if (month === monthSThree) {
        if (today_time >= fechas_ayer_time && !this.registro.pago3) this.notifyService.addNotify(res);
      }

      // Pago 4
      if (month === monthSFour) {
        if (today_time >= fechas_ayer_time && !this.registro.pago4) this.notifyService.addNotify(res);
      }
    }
  }
  

  // TODO: Obtener Matriculas
  obtenerMatriculas() {
    this.enrollmentService.getAllEnrollment()
    .subscribe({
      next: (items) => {
        let matriculas = Object.entries(items);
        this.matriculas = matriculas[1][1];

        // Guardamos valores en order
        for (let i = 0; i < this.matriculas.length; i++) {
          this.obtenerMatricula(this.matriculas[i].uid);
        }
      },
      error: (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    })
  }

  // TODO: Obtener matricula
  obtenerMatricula (id: string) {
    this.enrollmentService.getEnrollment(id)
    .subscribe({
      next: (item) => {
        const valor = Object.entries(item);
        this.matricula = valor[1][1];

        let inicio = Object(this.matricula.horario).fecha_inicial;

        // Datos
        this.notifyData(inicio, this.matricula, 'matricula');
      },
      error: (err) => {
        console.log(err);
        Swal.fire('Error', err.error.msg, 'error');
      }
    });
  }

  // TODO: Obtener Registros
  obtenerRegistros() {
    this.studentService.getAllStudent()
    .subscribe({
      next: (items) => {
        let registros = Object.entries(items);
        this.registros = registros[1][1];

        // Guardamos valores en order
        for (let i = 0; i < this.registros.length; i++) {
          this.obtenerRegistro(this.registros[i].uid);
        }
      },
      error: (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    })
  }

  // TODO: Obtener registro
  obtenerRegistro (id: string) {
    this.studentService.getStudent(id)
    .subscribe({
      next: (item) => {
        const valor = Object.entries(item);
        this.registro = valor[1][1];

        let inicio = Object(this.registro.horario).fecha_inicial;

        // Data
        this.notifyData(inicio, this.registro, 'registro');
      },
      error: (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    })
  }

  // Sidebar - Enlaces
  showNav ($event: MouseEvent) {
    let titleSchedule = document.getElementById('title-schedule');
    let titleForm = document.getElementById('title-form');
    let titleStudent = document.getElementById('title-student');
    let titleNotify = document.getElementById('title-notify');

    let listSchedule = document.querySelector('.sidenav__link-schedule ul');
    let listForm = document.querySelector('.sidenav__link-form ul');
    let listStudent = document.querySelector('.sidenav__link-student ul');
    
    let element = $event.currentTarget;

    // Si element es igual a los elementos de title
    if (titleSchedule === element) {
      titleSchedule?.classList.toggle('color-white');
      listSchedule?.classList.toggle('hidden');
    }

    if (titleForm === element) {
      titleForm?.classList.toggle('color-white');
      listForm?.classList.toggle('hidden');
    }

    if (titleStudent === element) {
      titleStudent?.classList.toggle('color-white');
      listStudent?.classList.toggle('hidden');
    }

    if (titleNotify === element) {
      titleNotify?.classList.toggle('color-white');
    }
  }

  // TODO: Cerrar sesión
  logout() {
    this.adminService.logout();
  }
}
