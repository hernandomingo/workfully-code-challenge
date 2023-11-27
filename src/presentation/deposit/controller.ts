import { Request, Response } from "express";

export class DepositController {
  constructor() {}

  postDeposit = (req: Request, res: Response) => {
    res.json("post depsoit");
  };
}
