import userModels from '../models/userModels';
import { ILoginReq, IUserReq } from '../types/user';
import userErrors from '../errors/userErrors';
import { loginAuth, userAuth } from '../lib/inputAuth';
import jwtToken from '../auth/token';
import { getCompleteUser } from '../lib/userUtils';

const create = async (user: IUserReq) => {
  const userValidate = userAuth(user);

  if (userValidate.error) throw userErrors.invalidInput;

  const userExists = await userModels.findByCpf(user.cpf);
  if (userExists)
    throw userErrors.alreadyRegistered;

  const completeUser = await getCompleteUser(user);
  await userModels.createUser(completeUser);
  return true;
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
  const token = jwtToken.generateToken(user);
  return token;
};

export default { create, login };
