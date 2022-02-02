import userModels from "../models/userModels";
import { IUserReq } from "../types/user";

export const getAccountNumber = async () => {
  const mongoNumberFind = await userModels.findAndUpdateCounter() as any;
  const absoluteNumber = mongoNumberFind.value.counter;
  const maskedNumber = `00000${absoluteNumber}`.slice(-5);

  return maskedNumber;
};

const initialWallet = 0;

export const getCompleteUser = async (user: IUserReq) => {
  const accountNumber = await getAccountNumber();
  return {
    account: accountNumber,
    ...user,
    wallet: initialWallet,
  };
};
