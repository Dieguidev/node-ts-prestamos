import { CustomError, LoanEntity } from "../../domain";



export class LoanMapper {
  static loanEntityFromObject(object: { [key: string]: any }): LoanEntity {
    const { id, _id, interest, months, money, userId,MonthlyInstallments, totalDebt } = object;

    if (!id && !_id) {
      throw CustomError.badRequest('Missing id');
    }
    if (!interest) throw CustomError.badRequest('Missing interest');
    if (!months) throw CustomError.badRequest('Missing months');
    if (!money) throw CustomError.badRequest('Missing money');
    if (!userId) throw CustomError.badRequest('Missing userId');
    if (!MonthlyInstallments) throw CustomError.badRequest('Missing MonthlyInstallments');
    if (!totalDebt) throw CustomError.badRequest('Missing totalDebt');

    return new LoanEntity(id || _id,months,money, interest,  userId, MonthlyInstallments, totalDebt);
  }
}
