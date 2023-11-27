import AccountRepository from "../repositories/account.repository";

class DepositUseCase {
  constructor(private accountRepository: AccountRepository) {}

  execute(accountId: string, amount: number): number {
    const account = this.accountRepository.find(accountId);
    const dailyDepositLimit =
      this.accountRepository.getDailyDepositLimit(accountId);

    const dailyDepositAmount = dailyDepositLimit?.totalDeposits ?? 0 + amount;

    // Validate deposit amount
    if (dailyDepositAmount > 5000) {
      throw new Error("Daily deposit limit exceeded");
    }

    // Update daily deposit limit
    if (dailyDepositLimit) {
      dailyDepositLimit.totalDeposits = dailyDepositAmount;
      this.accountRepository.updateDailyDepositLimit(
        accountId,
        dailyDepositLimit
      );
    }

    // Update account balance
    if (account) {
      account.balance += amount;
      this.accountRepository.update(account);
    }

    return account?.balance || 0;
  }
}

export default DepositUseCase;