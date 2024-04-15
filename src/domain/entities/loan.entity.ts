



export class LoanEntity {
  constructor(
    public id: string,
    public months: number,
    public money: number,
    public interest: number,
    public userId: string,
    public MonthlyInstallments: string[]
  ) {}
}
