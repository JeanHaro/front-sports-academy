export interface NotifyForm {
    uid: string;
    nombre: string;
    apellido: string;
    codigo: string;
    fecha_inicio: Date;
    fecha_pago: Date;

    diasA: number;
    horasA: number;
    minutosA: number;
    segundosA: number;

    diasD: number;
    horasD: number;
    minutosD: number;
    segundosD: number;
    
    tipo: string;
}