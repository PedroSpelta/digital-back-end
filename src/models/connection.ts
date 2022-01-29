import {MongoClient} from 'mongodb';
require('dotenv').config();

export async function connectToDatabase() {
  const { MONGO_DB_STRING, MONGO_DB_NAME } = process.env;

  const client: MongoClient = new MongoClient(
    MONGO_DB_STRING as string
  );

  await client.connect();

  return client.db(MONGO_DB_NAME);
}
