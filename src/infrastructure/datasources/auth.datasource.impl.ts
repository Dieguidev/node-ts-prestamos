import { Role } from "@prisma/client";
import { UserMapper } from "..";
import { BcryptAdapter } from "../../config";
import { prisma } from "../../data/postgresql";
import { AuthDatasource, CustomError, GetAndDeleteUserDto, LoginUserDto, RegisterUserDto, UpdateUserDto, UserEntity } from "../../domain";



//* type para declarar las funciones de dependencias y no tenerlas ocultas
type HashFunction = (password: string) => string;
type ConpareFunction = (password: string, hashed: string) => boolean;


export class AuthDatasourceImpl implements AuthDatasource {

  constructor(
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,  //BcryptAdapter.hash le da valor por defecto para no tener que enviarlo
    private readonly comparePassword: ConpareFunction = BcryptAdapter.compare,
  ) { }




  async update(updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const { id, email, address, district, province, phone } = updateUserDto;

    try {

      const [existsEmail, existsId] = await Promise.all([
        prisma.user.findFirst({ where: { email } }),
        prisma.user.findFirst({ where: { id } }),
      ])

      //1. verificar si el correo existe
      if (email && existsEmail) {
        throw CustomError.badRequest('User already exists');
      }
      //2. verificar si el id existe
      if (!existsId || !existsId!.status) {
        throw CustomError.badRequest('User not exists');
      }

      const user = await prisma.user.update({
        where: { id },
        data: {
          address: address ? address : existsId!.address,
          district: district ? district : existsId!.district,
          province: province ? province : existsId!.province,
          phone: phone ? phone : existsId!.phone,
          email: email ? email : existsId!.email,
        },
        include: { role: true },
      });

      return UserMapper.userEntityFromObject(user)

    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }





  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const { email, password } = loginUserDto;

    try {

      //1. verificar si el usuario existe
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw CustomError.badRequest('User not exists');
      }

      if (!user.status) {
        throw CustomError.badRequest('User is not active');
      }

      //2. verificar la contraseña hasheada
      const isMatchPassword = this.comparePassword(password, user.password);
      if (!isMatchPassword) {
        throw CustomError.badRequest('Invalid credentials')
      }

      return UserMapper.userEntityFromObject(user)

    } catch (error) {
      if (error instanceof CustomError) {
        throw error;

      }
      console.log(error);
      throw CustomError.internalServer();
    }
  }


  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {

    const { name, email, password, dni, lastName, address, district, phone, province } = registerUserDto;

    try {

      //1. verificar si el correo existe
      const existsEmail = await prisma.user.findUnique({ where: { email } });
      if (existsEmail) {
        throw CustomError.badRequest('Email already exists');
      }

      const existsDni = await prisma.user.findFirst({ where: { dni } });
      if (existsDni) {
        throw CustomError.badRequest('Dni already exists');
      }

      const role = await prisma.role.findFirst({ where: { role: "CLIENT" } })


      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: this.hashPassword(password),
          dni,
          lastName,
          address: address ? address : '',
          district: district ? district : '',
          phone: phone ? phone : '',
          province: province ? province : '',
          roleId: role!.id,
        },
        include: { role: true },
      });




      //3. mapear la respuesta a nuestra entidad
      return UserMapper.userEntityFromObject(user)

    } catch (error) {
      console.log(error);

      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async delete(getAndDeleteUserDto: GetAndDeleteUserDto): Promise<UserEntity> {

    const { id } = getAndDeleteUserDto;

    try {

      //1. verificar si el usuario existe
      const user = await prisma.user.update({
        where: { id },
        data: { status: false },
      });
      if (!user) {
        throw CustomError.badRequest('User not exists');
      }

      //2. mapear la respuesta a nuestra entidad
      return UserMapper.userEntityFromObject(user)

    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

}
