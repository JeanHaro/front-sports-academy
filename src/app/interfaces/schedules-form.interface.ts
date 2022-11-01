export interface ScheduleForm {
    uid: string;
    nombre: string;
    cant_matriculas: number;
    turno: string;
    edad_min: number;
    edad_max: number;
    hora_inicial: string;
    hora_final: string;
    fecha_inicial: Date;
    fecha_final: Date;
    order?: number;
}