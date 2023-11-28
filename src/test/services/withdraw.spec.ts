import AccountRepository from "../../repositories/account.repository";
import WithdrawService from "../../services/withdraw";

jest.mock("../../repositories/account.repository");

describe("WithdrawService", () => {
  let accountRepository: AccountRepository;
  let withdrawService: WithdrawService;

  beforeEach(() => {
    accountRepository =
      new AccountRepository() as jest.Mocked<AccountRepository>;
    withdrawService = new WithdrawService(accountRepository);
  });

  it("should withdraw amount and return updated balance", async () => {
    const accountId = 1;
    const amount = 100;

    (accountRepository.find as jest.Mock).mockResolvedValueOnce({
      id: accountId,
      balance: 500,
    });

    (accountRepository.update as jest.Mock).mockResolvedValueOnce(undefined);

    const updatedBalance = await withdrawService.execute(accountId, amount);

    expect(updatedBalance).toEqual(400);
    expect(accountRepository.find).toHaveBeenCalledWith(accountId);
    expect(accountRepository.update).toHaveBeenCalledWith({
      id: accountId,
      balance: 400,
    });
  });

  it("should throw an error if overdraft is exceeded", async () => {
    const accountId = 1;
    const amount = 400;

    // Mocking find method in accountRepository
    (accountRepository.find as jest.Mock).mockResolvedValueOnce({
      id: accountId,
      balance: 100,
    });

    await expect(withdrawService.execute(accountId, amount)).rejects.toThrow(
      "Overdraft exceeded"
    );

    // Ensure that the methods are called with the correct arguments
    expect(accountRepository.find).toHaveBeenCalledWith(accountId);
    expect(accountRepository.update).not.toHaveBeenCalled();
  });

  //   TODO
  //   it("should throw an error if account is not found", async () => {
  //     const accountId = 1;
  //     const amount = 100;

  //     (accountRepository.find as jest.Mock).mockResolvedValueOnce(null);

  //     await expect(withdrawService.execute(accountId, amount)).rejects.toThrow(
  //       "Account not found"
  //     );

  //     expect(accountRepository.find).toHaveBeenCalledWith(accountId);
  //     expect(accountRepository.update).not.toHaveBeenCalled();
  //   });
});
