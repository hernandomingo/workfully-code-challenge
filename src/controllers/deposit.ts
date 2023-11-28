import { Request, Response } from "express";
import { DepositDTO } from "../models/dtos/deposit.dto";
import DepositService from "../services/deposit";

export class DepositController {
  constructor(private depositUseCase: DepositService) {}

  postDeposit = async (req: Request, res: Response) => {
    const { accountId, amount } = req.body as DepositDTO;

    try {
      const balance = await this.depositUseCase.execute(accountId, amount);
      res.json({ message: "Deposit successful", balance });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
}
