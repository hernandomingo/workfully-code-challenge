import { Router } from "express";
import { WithdrawController } from "./controller";
import WithdrawUseCase from "../../domain/use-cases/withdraw";
import AccountRepository from "../../domain/repositories/account.repository";
import seedAccounts from "../../seeds/seedAccounts";

export class WithdrawRoutes {
  static get routes(): Router {
    const router = Router();

    //Todo: check dependency injection
    const accountRepository = new AccountRepository();
    const withdrawUseCase = new WithdrawUseCase(accountRepository);
    seedAccounts(accountRepository);

    const controller = new WithdrawController(withdrawUseCase);

    router.post("/", controller.postWithdraw);

    return router;
  }
}
