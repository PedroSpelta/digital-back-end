import userModels from '../models/userModels';
import { ILoginReq, IUserReq } from '../types/user';
import { StatusCodes } from 'http-status-codes';
import userErrors from '../errors/userErrors';
import { loginAuth, userAuth } from '../lib/inputAuth';
import { generateToken } from '../auth/token';

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
  const userValidate = userAuth(user);

  if (userValidate.error) throw userErrors.invalidInput;

  const userExists = await userModels.findByCpf(user.cpf);
  if (userExists)
    throw userErrors.alreadyRegistered;

  const completeUser = await getCompleteUser(user);
  const created = await userModels.createUser(completeUser);
  if (created.acknowledged) return true;
  throw 'Internal Error';
};

const login = async (user: ILoginReq) => {
  //validate entries
  const loginValidate = loginAuth(user);
  if (loginValidate.error) throw userErrors.invalidFormat;

  //validate user exists in the db
  const foundUser = await userModels.findByAccount(user.account);
  if (!foundUser || foundUser.password !== user.password) {
    throw userErrors.wrongCredentials;
  }

  //get the user token
  const token = generateToken(user);
  return token;
};

export default { create, login };
