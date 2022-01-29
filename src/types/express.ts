import { NextFunction, Request, Response } from "express";

export interface IExpressController {
  (req: Request, res: Response, next: NextFunction) : void
}