import AccountRepository from "../repositories/account.repository";

class TransferUseCase {
  constructor(private accountRepository: AccountRepository) {}

  execute(fromAccountId: string, toAccountId: string, amount: number): number {
    const fromAccount = this.accountRepository.find(fromAccountId);
    const toAccount = this.accountRepository.find(toAccountId);

    // Validate transfer amount
    if ((fromAccount?.balance ?? 0) - amount < 0) {
      throw new Error("Overdraft exceeded");
    }

    // Update accounts balances
    if (fromAccount && toAccount) {
      fromAccount.balance -= amount;
      toAccount.balance += amount;
      this.accountRepository.update(fromAccount);
      this.accountRepository.update(toAccount);
    }

    return toAccount?.balance || 0;
  }
}

export default TransferUseCase;
