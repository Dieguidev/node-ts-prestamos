import { Validators } from "../../../config";


export class CreateLoanDto {

  private constructor(
    public months: number,
    public money: number,
    public interest: number,
    public userId: string,
  ) { }


  static create(object: { [key: string]: any }): [string?, CreateLoanDto?] {
    const { months, money, interest, userId } = object;

    if (!months) return ['Missing months'];
    if (months < 1) return ['Months must be greater than 0'];
    if (!money) return ['Missing money'];
    if (money < 1) return ['Money must be greater than 0'];
    if (!interest) return ['Missing interest'];
    if (interest < 1) return ['Interest must be greater than 0'];
    if (!userId) return ['Missing userId'];
    if (!Validators.isValidUUID(userId)) return ['Invalid Id']

    return [undefined, new CreateLoanDto(
      months,
      money,
      interest,
      userId
    )];

  }
}
