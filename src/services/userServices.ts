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
    throw 'eae'

  const userExists = await userModels.find(user);
  if (userExists)
    throw 'test'

  const completeUser = getCompleteUser(user);
  const created = userModels.create(completeUser);
  return true;
};

export default { create };
