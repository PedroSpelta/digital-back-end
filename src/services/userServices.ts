import userModels from '../models/userModels';
import Joi from 'joi';
import { IUserReq } from '../types/user';
import { StatusCodes } from 'http-status-codes';

const userSchema = Joi.object({
  name: Joi.string().required(),
  cpf: Joi.string().min(11).max(14).required(),
  password: Joi.string().length(6).required(),
});

const initialWallet = 0;

const getAccountNumber = async () => {
  const mongoNumberFind = await userModels.findAndUpdateCounter();
  const absoluteNumber = mongoNumberFind.value?.counter;
  const maskedNumber = `00000${absoluteNumber}`.slice(-5);

  return maskedNumber;
};

const getCompleteUser = async (user: IUserReq) => {
  const accountNumber = await getAccountNumber();
  return {
    account: accountNumber,
    ...user,
    wallet: initialWallet,
  };
};

const create = async (user: IUserReq) => {
  const userValidate = userSchema.validate(user);
  if (userValidate.error)
    throw {
      status: StatusCodes.EXPECTATION_FAILED,
      message: 'Name or cpf invalid',
    };

  const userExists = await userModels.findUser(user.cpf);
  if (userExists)
    throw {
      status: StatusCodes.EXPECTATION_FAILED,
      message: 'Name or cpf already registered',
    };

  const completeUser = await getCompleteUser(user);
  const created = await userModels.createUser(completeUser);
  if (created.acknowledged) return true;
  throw 'Internal Error';
};

export default { create };
