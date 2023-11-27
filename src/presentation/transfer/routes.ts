import { Router } from "express";
import { TransferController } from "./controller";
import TransferUseCase from "../../domain/use-cases/tansfer";
import AccountRepository from "../../domain/repositories/account.repository";
import seedAccounts from "../../seeds/seedAccounts";

export class TransferRoutes {
  static get routes(): Router {
    const router = Router();

    //Todo: check dependency injection
    const accountRepository = new AccountRepository();
    const transferUseCase = new TransferUseCase(accountRepository);
    seedAccounts(accountRepository);

    const controller = new TransferController(transferUseCase);

    router.post("/", controller.postTransfer);

    return router;
  }
}
