import AccountRepository from "../repositories/account.repository";

class WithdrawService {
  constructor(private accountRepository: AccountRepository) {}

  async execute(accountId: number, amount: number): Promise<number> {
    const account = await this.accountRepository.find(accountId);

    // Validate withdraw amount
    if ((account?.balance ?? 0) - amount < -200) {
      throw new Error("Overdraft exceeded");
    }

    // Update account balance
    if (account) {
      account.balance -= amount;
      await this.accountRepository.update(account);
    }

    return account?.balance || 0;
  }
}

export default WithdrawService;
