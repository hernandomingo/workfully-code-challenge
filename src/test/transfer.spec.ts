import supertest from "supertest";
import express from "express";
import AccountRepository from "../domain/repositories/account.repository";
import TransferUseCase from "../domain/use-cases/transfer";
import seedAccounts from "../seeds/seedAccounts";
import { TransferController } from "../presentation/transfer/controller";

describe("DepositController", () => {
  const app = express();
  const accountRepository = new AccountRepository();
  const depositUseCase = new TransferUseCase(accountRepository);
  const depositController = new TransferController(depositUseCase);
  seedAccounts(accountRepository);

  it("should deposit into an existing account and return success message", async () => {
    app.use(express.json());
    app.post("/transfer", (req, res) =>
      depositController.postTransfer(req, res)
    );

    const response = await supertest(app)
      .post("/transfer")
      .send({ fromAccountId: "1", toAccountId: "2", amount: 50 });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Transfer successful");
    // expect(response.body.account).toHaveProperty("accountId", "1");
    expect(response.body).toHaveProperty("balance", 550);
  });
});
