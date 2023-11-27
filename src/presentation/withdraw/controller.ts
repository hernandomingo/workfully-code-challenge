import { Request, Response } from "express";
import WithdrawUseCase from "../../domain/use-cases/withdraw";
import { WithdrawDTO } from "../../domain/dtos/withdraw.dto";

export class WithdrawController {
  constructor(private withdrawUseCase: WithdrawUseCase) {}

  postWithdraw = (req: Request, res: Response) => {
    const { accountId, amount } = req.body as WithdrawDTO;

    try {
      const balance = this.withdrawUseCase.execute(accountId, amount);
      res.json({ message: "Withdraw successful", balance });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
}
