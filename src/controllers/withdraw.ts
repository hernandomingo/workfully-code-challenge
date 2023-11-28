import { Request, Response } from "express";
import WithdrawService from "../services/withdraw";
import { WithdrawDTO } from "../models/dtos/withdraw.dto";

export class WithdrawController {
  constructor(private withdrawUseCase: WithdrawService) {}

  postWithdraw = async (req: Request, res: Response) => {
    const { accountId, amount } = req.body as WithdrawDTO;

    try {
      const balance = await this.withdrawUseCase.execute(accountId, amount);
      res.json({ message: "Withdraw successful", balance });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
}
