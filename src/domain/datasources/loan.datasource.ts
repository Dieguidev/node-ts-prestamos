import { CreateLoanDto, LoanEntity } from "..";




export abstract class LoanDatasource {

  abstract createLoan(createLoanDto: CreateLoanDto): Promise<LoanEntity>;



}
