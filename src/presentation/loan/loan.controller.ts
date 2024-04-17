import { Request, Response } from "express";
import { CreateLoan, CustomError, LoanRepository } from "../../domain";
import { CreateLoanDto } from '../../domain/dtos/loans/create-loan.dto';



export class LoanController {
  constructor(
    private readonly loanRepository: LoanRepository,
  ) { }

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }

    console.log(`${error}`);




    return res.status(500).json({ error: 'Internal Server Error' })
  }


  createLoan = (req: Request, res: Response) => {
    const [error, createLoanDto] = CreateLoanDto.create(req.body)
    if (error) return res.status(400).json({ error })

    new CreateLoan(this.loanRepository)
      .execute(createLoanDto!)
      .then(loan => res.json(loan))
      .catch(error => this.handleError(error, res));
  }

}
