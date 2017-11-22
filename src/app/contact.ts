export class Contact{
    _id?: string;
    first_name: string;
    last_name: string;
    phone: string;
}

export class Envio{
    _id?:string; 
    sucursal_ini: string;
    sucursal_fin: string; 
    paquete: string; 
    usuario: string; 
    empleado: string;
    factura: string; 
    conductor: string; 
    transporte: string; 
    fecha: Date;
}

export class Paquete{
    _id?: string; 
    objeto: string;
    peso: string; 
    size: string;
}

export class Usuario{
    _id?: string;
    nombre: string; 
    direccion: string;
}

export class Sucursal{
    _id?: string; 
    direccion: string; 
}

export class Empleado{
    _id?: string;
    username: string;
    password: string;
    nombre: string; 
    tipo: string; 
}

export class Conductor{
    _id?: string; 
    nombre: string;
}

export class Transporte{
    _id?: string; 
    tipo: string; 
    placa: string; 
    disponibilidad: boolean;
    ubicacion: string;
}

export class Factura{
    _id?: string; 
    precio: string; 
    direccion_dest: string; 
    nombre_usuario_dest: string; 
    fecha: Date; 
}

