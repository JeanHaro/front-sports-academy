export interface StudentForm {
    uid: string;
    nombre: string;
    apellido: string;
    email: string;
    celular: number;
    dni: number;
    codigo: string;
    matricula?: boolean;
    pago1?: boolean;
    pago2?: boolean;
    pago3?: boolean;
    pago4?: boolean;
    horario: string;
    order?: number;
}