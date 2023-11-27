import { Router } from "express";
import { DepositController } from "./controller";

export class DepositRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new DepositController();

    router.post("/", controller.postDeposit);

    return router;
  }
}
