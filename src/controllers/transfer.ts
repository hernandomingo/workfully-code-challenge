import { Request, Response } from "express";
import TransferService from "../services/transfer";
import { TransferDTO } from "../models/dtos/transfer.dto";

export class TransferController {
  constructor(private transferUseCase: TransferService) {}

  postTransfer = async (req: Request, res: Response) => {
    const { fromAccountId, toAccountId, amount } = req.body as TransferDTO;

    try {
      const balance = await this.transferUseCase.execute(
        fromAccountId,
        toAccountId,
        amount
      );
      res.json({ message: "Transfer successful", balance });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
}
