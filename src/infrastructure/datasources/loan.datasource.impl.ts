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
          money: money,
          months: months,
          userId
        },
      });

      const totaiInterest = (+money * +interest) / 100;
      const totalDebt = +money + totaiInterest

      const monthlyPayment = totalDebt / +months

      for (let index = 1; index < +months + 1; index++) {
        const dueDate = new Date(loan.createdAt);
        dueDate.setDate(dueDate.getDate() + 30 * index);

        await prisma.monthlyInstallments.create({
          data: {
            quotaNumber: index,
            monthlyPayment,
            dueDate,
            loanId: loan.id
          },

        })
      }

      const loadWithQuotes = await prisma.loans.findUnique({
        where: { id: loan.id },
        include: {
          user: true,
          monthlyInstallments: true
        }
      })

      return LoanMapper.loanEntityFromObject({ ...loadWithQuotes, totalDebt })



    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      console.log(error);

      throw CustomError.internalServer();
    }
  }

}
