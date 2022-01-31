import { ConnectOptions, MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';


const getConnection = async () => {
  const mongo =  await MongoMemoryServer.create();
  const mockUri = mongo.getUri();
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  return MongoClient.connect(mockUri, options as ConnectOptions);
};

export default getConnection;
