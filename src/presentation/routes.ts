import { Router } from "express";
import { DepositRoutes } from "./deposit/routes";
import { WithdrawRoutes } from "./withdraw/routes";
import { TransferRoutes } from "./transfer/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/dummy", (request, response) => {
      response.send("something!");
    });

    router.use("/api/deposit", DepositRoutes.routes);
    router.use("/api/withdraw", WithdrawRoutes.routes);
    router.use("/api/transfer", TransferRoutes.routes);

    return router;
  }
}
