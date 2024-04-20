import { AuthRepository, UpdateUserDto } from "../..";





interface UserUpdate {
  user: {
    id: string;
    name: string;
    lastName: string;
    email: string;
    dni: string;
    roleId?: number;
    address?: string;
    district?: string;
    province?: string;
    phone?: string;
  }
}

interface UpdateUseUseCase {
  execute(updateUserDto: UpdateUserDto): Promise<UserUpdate>;
}


export class UpdateUser implements UpdateUseUseCase {

  constructor(
    private readonly authRepository: AuthRepository,
  ) { }

  async execute(updateUserDto: UpdateUserDto): Promise<UserUpdate> {

    const user = await this.authRepository.update(updateUserDto);

    return {
      user: {
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        dni: user.dni,
        roleId: user.roleId,
        address: user.address,
        district: user.district,
        province: user.province,
        phone: user.phone,
      }
    }
  }
}
