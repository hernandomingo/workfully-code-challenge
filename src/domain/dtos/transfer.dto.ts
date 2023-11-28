export class TransferDTO {
  constructor(
    public fromAccountId: number,
    public toAccountId: number,
    public amount: number
  ) {}
}
