



export class UserEntity {
  constructor(
    public id: string,
    public name: string,
    public lastName: string,
    public email: string,
    public dni: string,
    public password: string,
    public address?: string,
    public district?: string,
    public province?: string,
    public phone?: string,
    public role?: number,
    public status?: boolean,
  ) {}
}


// 1.	Los agentes pueden agregar clientes registrando los datos como DNI, Nombre y Apellido, dirección, distrito, provincia, teléfono, correo y estado.
