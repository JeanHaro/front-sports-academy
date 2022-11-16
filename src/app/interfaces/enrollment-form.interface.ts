export interface EnrollmentForm {
    uid: string;
    nombre: string;
    apellido: string;
    email: string;
    celular: number;
    dni: number;
    codigo: string;
    edad: number;
    matricula: boolean;
    horario: string;
    order?: number;
}