import { CreateLoanDto } from "../..";
import { LoanRepository } from '../../repositories/loan.repository';




interface Loan {
  loan: {
    id: string;
    months: number;
    money: number;
    interest: number;
    userId: string;
    totalDebt: number;
    status: boolean;
    monthlyInstallments: string[];
  }
}

interface CreateLoanUseCase {
  execute(createLoanDto: CreateLoanDto): Promise<Loan>
}


export class CreateLoan implements CreateLoanUseCase {

  constructor(
    private readonly loanRepository: LoanRepository
  ) { }

  async execute(createLoanDto: CreateLoanDto): Promise<Loan> {
    const loan = await this.loanRepository.createLoan(createLoanDto)

    return {
      loan: {
        id: loan.id,
        months: loan.months,
        money: +loan.money,
        interest: +loan.interest,
        userId: loan.userId,
        totalDebt: loan.totalDebt,
        status: loan.status,
        monthlyInstallments: loan.monthlyInstallments,
      }
    }
  }

}
