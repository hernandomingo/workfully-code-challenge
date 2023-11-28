import AccountRepository from "../repositories/account.repository";

class TransferUseCase {
  constructor(private accountRepository: AccountRepository) {}

  async execute(
    fromAccountId: number,
    toAccountId: number,
    amount: number
  ): Promise<number> {
    const fromAccount = await this.accountRepository.find(fromAccountId);
    const toAccount = await this.accountRepository.find(toAccountId);

    // Validate transfer amount
    if ((fromAccount?.balance ?? 0) - amount < 0) {
      throw new Error("Overdraft exceeded");
    }

    // Update accounts balances
    if (fromAccount && toAccount) {
      fromAccount.balance -= amount;
      toAccount.balance += amount;
      await this.accountRepository.update(fromAccount);
      await this.accountRepository.update(toAccount);
    }

    return toAccount?.balance || 0;
  }
}

export default TransferUseCase;
