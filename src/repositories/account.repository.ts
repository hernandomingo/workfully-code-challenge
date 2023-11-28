import Account from "../models/entities/account";
import { AccountModel } from "../models/account";

interface DailyDepositLimit {
  date: string;
  totalDeposits: number;
}

class AccountRepository {
  private dailyDepositLimits: Record<string, DailyDepositLimit> = {};

  find(accountId: number): Promise<Account | null> {
    return AccountModel.findOne({ where: { id: accountId } });
  }

  update(account: Account) {
    return AccountModel.update(
      { balance: account.balance },
      {
        where: {
          id: account.id,
        },
      }
    );
  }

  getDailyDepositLimit(accountId: number): DailyDepositLimit | undefined {
    return this.dailyDepositLimits[accountId];
  }

  updateDailyDepositLimit(
    accountId: number,
    dailyDepositLimit: DailyDepositLimit
  ): void {
    this.dailyDepositLimits[accountId] = dailyDepositLimit;
  }
}

export default AccountRepository;
