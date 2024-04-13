import { CustomError, UserEntity } from "../../domain";




export class UserMapper {

  static userEntityFromObject(object: { [key: string]: any }): UserEntity {



    const { id, _id, name, email, password, dni, lastName, address, district, phone, province, roleId } = object;

    if (!id && !_id) {
      throw CustomError.badRequest('Missing id');
    }
    if (!name) throw CustomError.badRequest('Missing name');

    if (!email) throw CustomError.badRequest('Missing email');

    if (!password) throw CustomError.badRequest('Missing password');

    if (!roleId) throw CustomError.badRequest('Missing role');



    return new UserEntity(
      id || _id,
      name,
      email,
      password,
      dni,
      lastName,
      address,
      district,
      phone,
      province,
      roleId
    );

  }


}
