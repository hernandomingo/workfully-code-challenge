import { Router } from "express";
import { DepositRoutes } from "./deposit/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/dummy", (request, response) => {
      response.send("something!");
    });

    router.use("/api/deposit", DepositRoutes.routes);

    return router;
  }
}
