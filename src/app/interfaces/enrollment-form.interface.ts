export interface EnrollmentForm {
    uid: string;
    nombre: string;
    apellido: string;
    email: string;
    celular: number;
    dni: number;
    codigo: string;
    matricula: boolean;
    horario: string;
    order?: number;
}