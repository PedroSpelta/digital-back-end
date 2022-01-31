import { Document, Filter } from 'mongodb';
import { connectToDatabase } from './connection';

const findOne = async (query: Filter<Document>, collection: string) => {
  const conn = await connectToDatabase();
  const coll = conn.collection(collection);
  const findResult = coll.findOne(query);
  return findResult;
};

const updateOne = async (
  filter: Filter<Document>,
  query: Filter<Document>,
  collection: string
) => {
  const conn = await connectToDatabase();
  const coll = conn.collection(collection);
  const updateResult = coll.updateOne(filter, query);
  return updateResult;
};

export default { findOne, updateOne };
