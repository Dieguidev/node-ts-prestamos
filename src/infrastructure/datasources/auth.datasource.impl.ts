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
    const { id, ...rest } = updateUserDto;

    try {




      //1. verificar si el correo existe
      const existsEmail = await prisma.user.findFirst({ where: { email: rest.email } });
      if (rest.email && existsEmail) {
        throw CustomError.badRequest('User already exists');
      }
      //2. verificar si el id existe
      const existsId = await prisma.user.findFirst({ where: { id } });
      if (!existsId || !existsId!.status) {
        throw CustomError.badRequest('User not exists');
      }

      if (rest.password) {
        rest.password = this.hashPassword(rest.password);
      }

      const role: Role = Role[rest.role as unknown as keyof typeof Role];

      const user = await prisma.user.update({
        where: { id },
        data: {
          ...rest,
          role: (role) ? [role]: existsId!.role,
        },
      });

      return UserMapper.userEntityFromObject(user as UserEntity)

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
      throw CustomError.internalServer();
    }
  }


  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {

    const { name, email, password } = registerUserDto;

    try {

      //1. verificar si el correo existe
      const existsEmail = await prisma.user.findUnique({ where: { email } });
      if (existsEmail) {
        throw CustomError.badRequest('User already exists');
      }


      //2. hash de contraseña
      const user = await prisma.user.create({
        data: { name, email, password: this.hashPassword(password) },
      });


      //3. mapear la respuesta a nuestra entidad
      return UserMapper.userEntityFromObject(user)

    } catch (error) {
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
