import { CreateLoanDto, LoanDatasource, LoanEntity, LoanRepository } from "../../domain";




export class LoanRepositoryImpl implements LoanRepository {
  constructor(
    private readonly loanDatasource: LoanDatasource
  ) { }


  createLoan(createLoanDto: CreateLoanDto): Promise<LoanEntity> {
    return this.loanDatasource.createLoan(createLoanDto);
  }
}
