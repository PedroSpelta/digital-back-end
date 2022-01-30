import { connectToDatabase } from './connection';

const createUser = async (user: any) => {
  const conn = await connectToDatabase();
  const coll = conn.collection('user');
  const createResult = await coll.insertOne(user);
  return createResult;
};

const findUser = async (user: any) => {
  const conn = await connectToDatabase();
  const coll = conn.collection('user');
  const findResult = await coll.find(user);
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

export default { createUser, findUser,findAndUpdateCounter };
