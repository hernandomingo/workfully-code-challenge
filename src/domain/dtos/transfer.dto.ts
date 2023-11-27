export class TransferDTO {
  constructor(
    public fromAccountId: string,
    public toAccountId: string,
    public amount: number
  ) {}
}
