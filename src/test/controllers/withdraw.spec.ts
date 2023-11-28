import supertest from "supertest";
import express from "express";
import AccountRepository from "../../repositories/account.repository";
import WithdrawUseCase from "../../services/withdraw";
import seedAccounts from "../../seeds/seedAccounts";
import { WithdrawController } from "../../controllers/withdraw";

describe("DepositController", () => {
  const app = express();
  const accountRepository = new AccountRepository();
  const depositUseCase = new WithdrawUseCase(accountRepository);
  const depositController = new WithdrawController(depositUseCase);
  seedAccounts(accountRepository);

  it("should deposit into an existing account and return success message", async () => {
    app.use(express.json());
    app.post("/withdraw", (req, res) =>
      depositController.postWithdraw(req, res)
    );

    const response = await supertest(app)
      .post("/withdraw")
      .send({ accountId: "1", amount: 50 });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Withdraw successful");
    // expect(response.body.account).toHaveProperty("accountId", "1");
    expect(response.body).toHaveProperty("balance", 950);
  });
});
