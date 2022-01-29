import { IExpressController } from '../types/express';
import userServices from '../services/userServices';
import { StatusCodes } from 'http-status-codes';

const create: IExpressController = async (req, res, next) => {
  try {
    const user = req.body;
    const createResponse = await userServices.create(user);
    if (createResponse)
      return res
        .status(StatusCodes.CREATED)
        .json({ message: 'User created successfully', user });
  } catch (err) {
    next(err);
  }
};

export default { create };
