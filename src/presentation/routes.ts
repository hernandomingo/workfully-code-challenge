import { Router } from "express";
import AccountRepository from "../domain/repositories/account.repository";
import WithdrawUseCase from "../domain/use-cases/withdraw";
import TransferUseCase from "../domain/use-cases/transfer";
import DepositUseCase from "../domain/use-cases/deposit";
import { DepositController } from "./deposit/controller";
import { WithdrawController } from "./withdraw/controller";
import { TransferController } from "./transfer/controller";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    //Todo: check dependency injection
    const accountRepository = new AccountRepository();

    const withdrawUseCase = new WithdrawUseCase(accountRepository);
    const transferUseCase = new TransferUseCase(accountRepository);
    const depositUseCase = new DepositUseCase(accountRepository);

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
