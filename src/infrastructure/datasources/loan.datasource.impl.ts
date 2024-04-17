import { LoanMapper } from "..";
import { prisma } from "../../data/postgresql";
import { CreateLoanDto, CustomError, LoanDatasource, LoanEntity } from "../../domain";



export class LoanDataSourceImpl implements LoanDatasource {
  async createLoan(createLoanDto: CreateLoanDto): Promise<LoanEntity> {
    const { interest, money, months, userId } = createLoanDto;

    try {
      const existUser = await prisma.user.findUnique({ where: { id: userId } });
      if (!existUser || !existUser.status) throw CustomError.badRequest('User not found');

      const loan = await prisma.loans.create({
        data: {
          interest: +interest,
          money: +money,
          months: +months,
          userId
        },
        include: {
          user: true,
          MonthlyInstallments: true
        }
      });

      const totaiInterest = (+money * +interest) / 100;
      const totalDebt = +money + totaiInterest


      return LoanMapper.loanEntityFromObject({...loan,totalDebt })



    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      console.log(error);

      throw CustomError.internalServer();
    }
  }

}
