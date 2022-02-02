import { Document, Filter } from 'mongodb';
import { connectToDatabase } from './connection';
import mongoModels from './mongoModels';

const findByAccount = async (account: string) => {
  const foundResponse = await mongoModels.findOne({ account }, 'user');  
  return foundResponse;
};

const updateOne = async (filter: Filter<Document>, query: Filter<Document>) => {  
  const updateResponse = await mongoModels.updateOne(filter, query, 'user');
  return updateResponse;
};

export default { findByAccount, updateOne };
