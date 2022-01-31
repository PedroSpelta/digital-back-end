import { Db, MongoClient } from 'mongodb';
require('dotenv').config();

const { MONGO_DB_STRING, MONGO_DB_NAME } = process.env;

let db: Db | null = null;

export async function connectToDatabase() {
  return db
    ? Promise.resolve(db)
    : MongoClient.connect(MONGO_DB_STRING as string).then((conn) => {
        db = conn.db(`${MONGO_DB_NAME}`);
        return db;
      });
}
