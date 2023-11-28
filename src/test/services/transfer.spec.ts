import AccountRepository from "../../repositories/account.repository";
import TransferService from "../../services/transfer";

jest.mock("../../repositories/account.repository");

describe("TransferService", () => {
  let accountRepository: AccountRepository;
  let transferService: TransferService;

  beforeEach(() => {
    accountRepository =
      new AccountRepository() as jest.Mocked<AccountRepository>;
    transferService = new TransferService(accountRepository);
  });

  it("should transfer amount between accounts and return updated balance", async () => {
    const fromAccountId = 1;
    const toAccountId = 2;
    const amount = 500;

    (accountRepository.find as jest.Mock).mockResolvedValueOnce({
      id: fromAccountId,
      balance: 1000,
    });

    (accountRepository.find as jest.Mock).mockResolvedValueOnce({
      id: toAccountId,
      balance: 1500,
    });

    (accountRepository.update as jest.Mock).mockResolvedValueOnce(500);

    (accountRepository.update as jest.Mock).mockResolvedValueOnce(2000);

    const updatedBalance = await transferService.execute(
      fromAccountId,
      toAccountId,
      amount
    );

    expect(updatedBalance).toEqual(2000);
    expect(accountRepository.find).toHaveBeenCalledWith(fromAccountId);
    expect(accountRepository.find).toHaveBeenCalledWith(toAccountId);
    expect(accountRepository.update).toHaveBeenCalledWith({
      id: fromAccountId,
      balance: 500,
    });
    expect(accountRepository.update).toHaveBeenCalledWith({
      id: toAccountId,
      balance: 2000,
    });
  });

  it("should throw an error if overdraft is exceeded", async () => {
    const fromAccountId = 1;
    const toAccountId = 2;
    const amount = 1500;

    (accountRepository.find as jest.Mock).mockResolvedValueOnce({
      id: fromAccountId,
      balance: 1000,
    });

    (accountRepository.find as jest.Mock).mockResolvedValueOnce({
      id: toAccountId,
      balance: 1500,
    });

    await expect(
      transferService.execute(fromAccountId, toAccountId, amount)
    ).rejects.toThrow("Overdraft exceeded");

    expect(accountRepository.find).toHaveBeenCalledWith(fromAccountId);
    expect(accountRepository.find).toHaveBeenCalledWith(toAccountId);
    expect(accountRepository.update).not.toHaveBeenCalled();
  });

  //   TODO:
  //   it("should throw an error if fromAccount is not found", async () => {
  //     const fromAccountId = 1;
  //     const toAccountId = 2;
  //     const amount = 500;

  //     // Mocking find method in accountRepository for fromAccount
  //     (accountRepository.find as jest.Mock).mockResolvedValueOnce(null);

  //     await expect(
  //       transferService.execute(fromAccountId, toAccountId, amount)
  //     ).rejects.toThrow("From account not found");

  //     // Ensure that the methods are called with the correct arguments
  //     expect(accountRepository.find).toHaveBeenCalledWith(fromAccountId);
  //     expect(accountRepository.find).not.toHaveBeenCalledWith(toAccountId);
  //     expect(accountRepository.update).not.toHaveBeenCalled();
  //   });

  //   TODO
  //   it("should throw an error if toAccount is not found", async () => {
  //     const fromAccountId = 1;
  //     const toAccountId = 2;
  //     const amount = 500;

  //     // Mocking find method in accountRepository for fromAccount
  //     (accountRepository.find as jest.Mock).mockResolvedValueOnce({
  //       id: fromAccountId,
  //       balance: 1000,
  //     });

  //     // Mocking find method in accountRepository for toAccount
  //     (accountRepository.find as jest.Mock).mockResolvedValueOnce(null);

  //     await expect(
  //       transferService.execute(fromAccountId, toAccountId, amount)
  //     ).rejects.toThrow("To account not found");

  //     // Ensure that the methods are called with the correct arguments
  //     expect(accountRepository.find).toHaveBeenCalledWith(fromAccountId);
  //     expect(accountRepository.find).toHaveBeenCalledWith(toAccountId);
  //   });
});
