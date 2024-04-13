import { Validators } from "../../../config";




export class UpdateUserDto {


  private constructor(
    public id: string,
    public email?: string,
    public address?: string,
    public district?: string,
    public province?: string,
    public phone?: string,
  ) { }

  static create(object: { [key: string]: any }): [string?, UpdateUserDto?] {
    const { id, email, address, district, province, phone } = object;

    if (!id) return ['Missing id'];
    if (!Validators.isValidUUID(id)) return ['Invalid Id']
    if (email && !Validators.email.test(email)) return ['Invalid email'];
    let emailLowerCase
    if (email) {
      emailLowerCase = email.toLowerCase();
    }

    return [undefined, new UpdateUserDto(id, emailLowerCase, address, district, province, phone)];
  }
}
