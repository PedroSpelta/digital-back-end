import { IExpressController } from "../types/express";

const deposit:IExpressController = (req, res) => {
  const {} = req.body;
  const a = req.headers.authorization;
  console.log(a);
}

export {deposit};