import { IDepositReq, ITransferReq } from '../types/transfer';
import bankingErrors from '../errors/bankingErrors';

import bankingModels from '../models/bankingModels';
import jwtToken from '../auth/token';
import { string } from 'joi';

const validateQuantity = (quantity: number) => {
  if (quantity > 2000 || quantity < 0 || typeof quantity === 'string')
    throw bankingErrors.invalidQuantity;
};

const deposit = async ({ quantity, token }: IDepositReq) => {
  //validate token
  const { data: user } = jwtToken.validateToken(token);

  //validate quantity
  validateQuantity(quantity);

  //create query to update wallet value
  const filter = { account: user.account };
  const query = { $inc: { wallet: quantity } };
  const updateResponse = await bankingModels.updateOne(filter, query);

  //create object to respond the controller
  const depositResponse = {
    done: updateResponse.acknowledged,
    account: user.account,
  };
  return depositResponse;
};

const transfer = async ({ transferAccount, quantity, token }: ITransferReq) => {
  //validate token
  const { data: sender } = validateToken(token);

  //validate quantity
  validateQuantity(quantity);

  //validate sender has enough in wallet
  const senderData = await bankingModels.findByAccount(sender.account);
  if (senderData?.wallet < quantity) throw bankingErrors.notEnoughTransfer;

  // create query to update wallet value
  const filterReceiver = { account: transferAccount };
  const queryReceiver = { $inc: { wallet: quantity } };
  const updateReceiverResponse = await bankingModels.updateOne(
    filterReceiver,
    queryReceiver
  );

  //create query to update sender wallet value
  const filterSender = { account: sender.account };
  const querySender = { $inc: { wallet: -quantity } };
  const updateSenderResponse = await bankingModels.updateOne(
    filterSender,
    querySender
  );

  return { senderAccount: senderData?.account };
};

export default { deposit, transfer };
