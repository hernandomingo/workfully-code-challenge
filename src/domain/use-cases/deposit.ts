import AccountRepository from "../repositories/account.repository";
import TransactionRepository from "../repositories/transaction.repository";

class DepositUseCase {
  constructor(
    private accountRepository: AccountRepository,
    private transactionRepository: TransactionRepository
  ) {}

  async execute(accountId: number, amount: number): Promise<number> {
    const account = await this.accountRepository.find(accountId);
    const todaysDeposits = await this.transactionRepository.findTodaysDeposits(
      accountId
    );

    // Validate deposit amount
    if ((todaysDeposits ?? 0) + amount > 5000) {
      throw new Error("Daily deposit limit exceeded");
    }

    // Create deposit transaction
    if (account) {
      await this.transactionRepository.create(account.id, amount, "deposit");
    }

    // Update account balance
    if (account) {
      account.balance += amount;
      await this.accountRepository.update(account);
    }

    return account?.balance || 0;
  }
}

export default DepositUseCase;
