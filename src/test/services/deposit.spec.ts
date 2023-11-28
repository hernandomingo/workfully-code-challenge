import AccountRepository from "../../repositories/account.repository";
import TransactionRepository from "../../repositories/transaction.repository";
import DepositService from "../../services/deposit";

jest.mock("../../repositories/account.repository");
jest.mock("../../repositories/transaction.repository");

describe("DepositService", () => {
  let accountRepository: AccountRepository;
  let transactionRepository: TransactionRepository;
  let depositService: DepositService;

  beforeEach(() => {
    accountRepository =
      new AccountRepository() as jest.Mocked<AccountRepository>;
    transactionRepository =
      new TransactionRepository() as jest.Mocked<TransactionRepository>;
    depositService = new DepositService(
      accountRepository,
      transactionRepository
    );
  });

  it("should deposit amount and return updated balance", async () => {
    const accountId = 1;
    const amount = 2000;

    (accountRepository.find as jest.Mock).mockResolvedValueOnce({
      id: accountId,
      balance: 1000,
    });

    (
      transactionRepository.findTodaysDeposits as jest.Mock
    ).mockResolvedValueOnce(1000);

    (transactionRepository.create as jest.Mock).mockResolvedValueOnce(
      undefined
    );

    (accountRepository.update as jest.Mock).mockResolvedValueOnce(undefined);

    const updatedBalance = await depositService.execute(accountId, amount);

    expect(updatedBalance).toEqual(3000);
    expect(accountRepository.find).toHaveBeenCalledWith(accountId);
    expect(transactionRepository.findTodaysDeposits).toHaveBeenCalledWith(
      accountId
    );
    expect(transactionRepository.create).toHaveBeenCalledWith(
      accountId,
      amount,
      "deposit"
    );
    expect(accountRepository.update).toHaveBeenCalledWith({
      id: accountId,
      balance: 3000,
    });
  });

  it("should throw an error if the daily deposit limit is exceeded", async () => {
    const accountId = 1;
    const amount = 6000;

    (
      transactionRepository.findTodaysDeposits as jest.Mock
    ).mockResolvedValueOnce(4500);

    await expect(depositService.execute(accountId, amount)).rejects.toThrow(
      "Daily deposit limit exceeded"
    );

    expect(transactionRepository.findTodaysDeposits).toHaveBeenCalledWith(
      accountId
    );
  });
});
