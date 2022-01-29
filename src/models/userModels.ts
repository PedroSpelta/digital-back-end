import { connectToDatabase } from "./connection"

const create = async (user:any) => {
  const conn = await connectToDatabase();
  const coll = conn.collection('user');
  const createResult = await coll.insertOne(user);
  return createResult;
};

const find = async (user:any) => {
  const conn = await connectToDatabase();
  const coll = conn.collection('user');
  const findResult = await coll.find(user);
  const findArray = await findResult.toArray();  
  
  if(findArray.length === 0) return false;
  return true;
}

export default {create, find};
