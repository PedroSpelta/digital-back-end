import userModels from '../models/userModels';
import Joi from 'joi';
import { ILoginReq, IUserReq } from '../types/user';
import { StatusCodes } from 'http-status-codes';
import userErrors from '../errors/userErrors';

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

  const userExists = await userModels.findByCpf(user.cpf);
  if (userExists)
    throw {
      status: StatusCodes.EXPECTATION_FAILED,
      message: 'Cpf already have an account',
    };

  const completeUser = await getCompleteUser(user);
  const created = await userModels.createUser(completeUser);
  if (created.acknowledged) return true;
  throw 'Internal Error';
};

const login = async (user: ILoginReq) => {
  const foundUser = await userModels.findByAccount(user.account);
  if(!foundUser || foundUser.password !== user.password) {    
    throw userErrors.wrongCredentials;
  }
};

export default { create, login };
