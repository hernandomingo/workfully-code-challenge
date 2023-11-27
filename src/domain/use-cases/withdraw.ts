import AccountRepository from "../repositories/account.repository";

class WithdrawUseCase {
  constructor(private accountRepository: AccountRepository) {}

  execute(accountId: string, amount: number): number {
    const account = this.accountRepository.find(accountId);

    // Validate withdraw amount
    if ((account?.balance ?? 0) - amount < -200) {
      throw new Error("Overdraft exceeded");
    }

    // Update account balance
    if (account) {
      account.balance -= amount;
      this.accountRepository.update(account);
    }

    return account?.balance || 0;
  }
}

export default WithdrawUseCase;
