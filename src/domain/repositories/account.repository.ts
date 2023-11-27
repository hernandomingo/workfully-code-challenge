import Account from "../entities/account";

interface DailyDepositLimit {
  date: string;
  totalDeposits: number;
}

class AccountRepository {
  private accounts: Record<string, Account> = {};
  private dailyDepositLimits: Record<string, DailyDepositLimit> = {};

  find(accountId: string): Account | undefined {
    return this.accounts[accountId];
  }

  update(account: Account): void {
    this.accounts[account.id] = account;
  }

  getDailyDepositLimit(accountId: string): DailyDepositLimit | undefined {
    return this.dailyDepositLimits[accountId];
  }

  updateDailyDepositLimit(
    accountId: string,
    dailyDepositLimit: DailyDepositLimit
  ): void {
    this.dailyDepositLimits[accountId] = dailyDepositLimit;
  }
}

export default AccountRepository;
