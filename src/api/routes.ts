import { Router } from "express";
import AccountRepository from "../repositories/account.repository";
import WithdrawUseCase from "../services/withdraw";
import TransferUseCase from "../services/transfer";
import DepositUseCase from "../services/deposit";
import { DepositController } from "../controllers/deposit";
import { WithdrawController } from "../controllers/withdraw";
import { TransferController } from "../controllers/transfer";
import TransactionRepository from "../repositories/transaction.repository";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    //Todo: check dependency injection
    const accountRepository = new AccountRepository();
    const transactionRepository = new TransactionRepository();

    const withdrawUseCase = new WithdrawUseCase(accountRepository);
    const transferUseCase = new TransferUseCase(accountRepository);
    const depositUseCase = new DepositUseCase(
      accountRepository,
      transactionRepository
    );

    const depositController = new DepositController(depositUseCase);
    const withdrawController = new WithdrawController(withdrawUseCase);
    const transferController = new TransferController(transferUseCase);

    router.use("/dummy", (request, response) => {
      response.send("something!");
    });

    router.use("/api/deposit", depositController.postDeposit);
    router.use("/api/withdraw", withdrawController.postWithdraw);
    router.use("/api/transfer", transferController.postTransfer);

    return router;
  }
}
