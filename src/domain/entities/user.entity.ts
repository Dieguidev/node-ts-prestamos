



export class UserEntity {
  constructor(
    public id: string,
    public name: string,
    public lastName: string,
    public email: string,
    public dni: string,
    public password: string,
    public roleId: number,
    public address?: string,
    public district?: string,
    public province?: string,
    public phone?: string,
    public status?: boolean,
    public loans?: string[]
  ) {}
}


// 1.	Los agentes pueden agregar clientes registrando los datos como DNI, Nombre y Apellido, dirección, distrito, provincia, teléfono, correo y estado.
// 2.	Los agentes pueden editar solo los siguientes datos del cliente: Dirección, distrito, provincia, teléfono, correo y estado.
// 3.	Para dar de baja a un cliente es necesario cambiarle su estado de activo a inactivo.
// 4.	Se puede mostrar el listado de clientes.
