import { ConnectOptions, MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongo = MongoMemoryServer.create();

const getConnection = async () => {
  const mockUri = (await mongo).getUri();
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  return MongoClient.connect(mockUri, options as ConnectOptions);
};

export default getConnection;
