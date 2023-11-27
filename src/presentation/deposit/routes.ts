import { Router } from "express";
import { DepositController } from "./controller";
import DepositUseCase from "../../domain/use-cases/deposit";
import AccountRepository from "../../domain/repositories/account.repository";
import seedAccounts from "../../seeds/seedAccounts";

export class DepositRoutes {
  static get routes(): Router {
    const router = Router();

    //Todo: check dependency injection
    const accountRepository = new AccountRepository();
    const depositUseCase = new DepositUseCase(accountRepository);
    seedAccounts(accountRepository);

    const controller = new DepositController(depositUseCase);

    router.post("/", controller.postDeposit);

    return router;
  }
}
