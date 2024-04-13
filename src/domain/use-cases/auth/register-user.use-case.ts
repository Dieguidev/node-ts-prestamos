import { JwtAdapter } from '../../../config/jwt';
import { RegisterUserDto } from '../../dtos/auth/register-user.dto';
import { CustomError } from '../../errors/custom.error';
import { AuthRepository } from '../../repositories/auth.repository';

interface UserToken {
  token: string;
  user: {
    id: string;
    name: string;
    lastName: string;
    email: string;
    dni: string;
    role?: string;
    address?: string;
    district?: string;
    province?: string;
    phone?: string;
  }
}

type SignToken = (payload: any, duration?: string)=> Promise<string | null>

interface RegisterUserUseCase {
  execute(registerUserDto: RegisterUserDto): Promise<UserToken>;
}


export class RegisterUser implements RegisterUserUseCase {

  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken,
  ) { }

  async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {
    //crear usuario en la base de datos
    const user = await this.authRepository.register(registerUserDto);

    // console.log(user);


    //token
    const token = await this.signToken({id:user.id},'2h');
    if (!token) throw CustomError.internalServer('Error generating token');


    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        dni: user.dni,
        role: user.role,
        address: user.address,
        district: user.district,
        province: user.province,
        phone: user.phone,
      }
    }
  }
}
