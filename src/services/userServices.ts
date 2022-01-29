import userModels from '../models/userModels';
import Joi from 'joi';
import { IUserReq } from '../types/user';
import { StatusCodes } from 'http-status-codes';

const userSchema = Joi.object({
  name: Joi.string().required(),
  cpf: Joi.string().min(11).max(14).required(),
});

const initialWallet = 0;

const getCompleteUser = (user: IUserReq) => ({
  ...user,
  wallet: initialWallet,
});

const create = async (user: IUserReq) => {
  const userValidate = userSchema.validate(user);
  if (userValidate.error)
    throw {
      status: StatusCodes.EXPECTATION_FAILED,
      message: 'Name or cpf invalid',
    };

  const userExists = await userModels.find(user);
  if (userExists)
    throw {
      status: StatusCodes.EXPECTATION_FAILED,
      message: 'Name or cpf already registered',
    };

  const completeUser = getCompleteUser(user);
  const created = await userModels.create(completeUser);
  if (created.acknowledged) return true;
  throw 'Internal Error';
};

export default { create };
