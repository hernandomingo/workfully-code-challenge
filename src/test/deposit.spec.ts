import supertest from "supertest";
import express from "express";
import AccountRepository from "../domain/repositories/account.repository";
import DepositUseCase from "../domain/use-cases/deposit";
import seedAccounts from "../seeds/seedAccounts";
import { DepositController } from "../presentation/deposit/controller";

describe("DepositController", () => {
  const app = express();
  const accountRepository = new AccountRepository();
  const depositUseCase = new DepositUseCase(accountRepository);
  const depositController = new DepositController(depositUseCase);
  seedAccounts(accountRepository);

  it("should deposit into an existing account and return success message", async () => {
    app.use(express.json());
    app.post("/deposit", (req, res) => depositController.postDeposit(req, res));

    const response = await supertest(app)
      .post("/deposit")
      .send({ accountId: "1", amount: 50 });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Deposit successful");
    // expect(response.body.account).toHaveProperty("accountId", "1");
    expect(response.body).toHaveProperty("balance", 1050);
  });
});
