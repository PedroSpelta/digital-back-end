import { Document } from 'mongodb';
import { connectToDatabase } from './connection';
import mongoModels from './mongoModels';

const createUser = async (user: any) => {
  const conn = await connectToDatabase();
  const coll = conn.collection('user');
  const createResult = await coll.insertOne(user);
  return createResult;
};

const findByCpf = async (cpf: string) => {
  const conn = await connectToDatabase();
  const coll = conn.collection('user');
  const findResult = await coll.find({cpf});
  const findArray = await findResult.toArray();

  if (findArray.length === 0) return false;
  return true;
};

const findAndUpdateCounter = async () => {
  const conn = await connectToDatabase();
  const coll = conn.collection('accountCounter');
  const counterResult = await coll.findOneAndUpdate(
    {},
    { $inc: { counter: 1 } },
    { returnDocument: 'after', upsert: true }
  );
  
  return counterResult;
};

interface IFindAccount {
  (account: string) : Document | null;
}

const findByAccount:IFindAccount = async (account) => {
  const findResult = await mongoModels.findOne({account},'user');
  return findResult;
}

export default { createUser, findByCpf,findAndUpdateCounter,findByAccount };
