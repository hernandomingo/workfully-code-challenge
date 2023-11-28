import Transaction from "../entities/transaction";
import { TransactionModel } from "../../models/transaction";

class TransactionRepository {
  create(accountId: number, amount: number, transactionType: string) {
    return TransactionModel.create({
      accountId,
      amount,
      transactionType,
      date: new Date(),
    });
  }

  findTodaysDeposits(accountId: number) {
    return TransactionModel.sum("amount", {
      where: {
        accountId,
        date: new Date(),
      },
    });
  }
}

export default TransactionRepository;
