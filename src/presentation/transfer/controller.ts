import { Request, Response } from "express";
import TransferUseCase from "../../domain/use-cases/transfer";
import { TransferDTO } from "../../domain/dtos/transfer.dto";

export class TransferController {
  constructor(private transferUseCase: TransferUseCase) {}

  postTransfer = (req: Request, res: Response) => {
    const { fromAccountId, toAccountId, amount } = req.body as TransferDTO;

    try {
      const balance = this.transferUseCase.execute(
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
