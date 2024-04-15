import { CreateLoanDto, LoanEntity } from "..";

export abstract class LoanRepository {

  abstract createLoan(createLoanDto: CreateLoanDto): Promise<LoanEntity>;



}
