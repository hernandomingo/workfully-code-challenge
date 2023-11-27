import { Request, Response } from "express";
import { DepositDTO } from "../../domain/dtos/deposit.dto";
import DepositUseCase from "../../domain/use-cases/deposit";

export class DepositController {
  constructor(private depositUseCase: DepositUseCase) {}

  postDeposit = (req: Request, res: Response) => {
    const { accountId, amount } = req.body as DepositDTO;

    try {
      const balance = this.depositUseCase.execute(accountId, amount);
      res.json({ message: "Deposit successful", balance });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
}
