class Transaction {
  constructor(
    public accountId: number,
    public transactionType: string,
    public amount: number,
    public date: string
  ) {}
}

export default Transaction;
