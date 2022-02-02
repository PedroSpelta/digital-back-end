import { IExpressController } from '../types/express';
import bankingServices from '../services/bankingServices';
import bankingErrors from '../errors/bankingErrors';
import { StatusCodes } from 'http-status-codes';

const deposit: IExpressController = async (req, res, next) => {
  try {
    //getting request data
    const { quantity } = req.body;
    const token = req.headers.authorization;

    //check token existence
    if (!token) throw bankingErrors.missingToken;

    //making deposit to the db
    const { account } = await bankingServices.deposit({
      quantity,
      token,
    });

    return res.status(StatusCodes.OK).json({
      message: `Successfully deposited R$${quantity} on account #${account}`,
    });
  } catch (err) {
    next(err);
  }
};

const transfer: IExpressController = async (req, res, next) => {
  try {
    const { quantity, transferAccount } = req.body;
    const token = req.headers.authorization;

    //check token existence
    if (!token) throw bankingErrors.missingToken;

    //make transfer
    const { senderAccount } = await bankingServices.transfer({
      transferAccount,
      quantity,
      token,
    });

    return res.status(StatusCodes.OK).json({
      message: `Account #${senderAccount} successfully transferred R$${quantity} to account #${transferAccount}`,
    });
  } catch (err) {
    next(err);
  }
};

export default { deposit, transfer };
