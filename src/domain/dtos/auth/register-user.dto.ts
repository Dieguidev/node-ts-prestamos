import { Validators } from "../../../config";




export class RegisterUserDto {


  private constructor(
    public name: string,
    public lastName: string,
    public email: string,
    public dni: string,
    public password: string,
    public address?: string,
    public district?: string,
    public province?: string,
    public phone?: string,
  ) { }

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { name, email, password, lastName, dni, address, district, province, phone } = object;

    if (!name) return ['Missing name'];
    if (!lastName) return ['Missing lastName'];
    if (!dni) return ['Missing dni'];
    if (dni.length < 8) return ['Dni must be at least 8 characters'];
    if (!email) return ['Missing email'];
    if (!Validators.email.test(email)) return ['Invalid email'];
    if (!password) return ['Missing password'];
    if (password.length < 6) return ['Password must be at least 6 characters'];




    return [undefined, new RegisterUserDto(
      name,
      lastName,
      email.toLowerCase(),
      dni,
      password,
      address,
      district,
      province,
      phone,
    )];

  }
}
