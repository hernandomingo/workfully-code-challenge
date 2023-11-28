import Account from "../domain/entities/account";
import AccountRepository from "../domain/repositories/account.repository";

const seedAccounts = (accountRepository: AccountRepository): void => {
  const initialAccounts: Account[] = [
    new Account(1, 1000),
    new Account(2, 500),
    new Account(3, 2000),
  ];

  initialAccounts.forEach((account) => {
    accountRepository.update(account);
  });
};

export default seedAccounts;
