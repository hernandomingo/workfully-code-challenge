import Account from "../entities/account";
import { AccountModel } from "../../models/account";

interface DailyDepositLimit {
  date: string;
  totalDeposits: number;
}

class AccountRepository {
  private dailyDepositLimits: Record<string, DailyDepositLimit> = {};

  find(accountId: string): Promise<Account | null> {
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
