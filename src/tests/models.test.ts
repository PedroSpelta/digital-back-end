import sinon from 'sinon';
import { expect } from 'chai';
import { MongoClient } from 'mongodb';
import userModels from '../models/userModels';
import getConnection from './mongo';
import { afterEach } from 'mocha';
import bankingModels from '../models/bankingModels';

const userCreate1 = {
  name: 'Pedro',
  cpf: '169.284.217-01',
  password: '123456',
};
const userCreate2 = {
  name: 'Maria',
  cpf: '169.284.217-02',
  password: '123456',
};
const userDb1 = {
  name: 'Pedro',
  cpf: '169.284.217-01',
  password: '123456',
  account: '00001',
  wallet: 0,
};
const userDb2 = {
  name: 'Maria',
  cpf: '169.284.217-02',
  password: '123456',
  account: '00002',
  wallet: 0,
};

interface IUserDb {
  name: string;
  account: string;
  cpf: string;
  password: string;
  wallet: number;
}

describe('Testing models', async () => {
  let connectionMock: MongoClient;
  let sandBox = sinon.createSandbox();
  beforeEach(async () => {
    connectionMock = await getConnection();

    sandBox.stub(MongoClient, 'connect').resolves(connectionMock);
  });
  afterEach(async () => {
    connectionMock.db('digital').dropDatabase();
    sandBox.restore();
  });

  describe('Testing user model', async () => {
    describe('Testing create model', () => {
      afterEach(async () => {});
      it('Should create the user', async () => {
        const createResponse = await userModels.createUser({ ...userCreate1 });
        const findResponse = await connectionMock
          .db('digital')
          .collection('user')
          .findOne(userCreate1);
        expect(findResponse?.name).to.be.equal(userCreate1.name);
      });
      it('Should return acknowledged', async () => {
        const createResponse = await userModels.createUser({ ...userCreate2 });
        const { acknowledged } = createResponse;
        expect(acknowledged).to.be.equal(true);
      });
    });

    describe('Testing find by cpf', () => {
      afterEach(async () => {});
      it('Should return true if cpf exists', async () => {
        await connectionMock
          .db('digital')
          .collection('user')
          .insertOne(userCreate1);
        const findResponse = await userModels.findByCpf('169.284.217-01');
        expect(findResponse).to.be.equal(true);
      });
      it('Should return false if cpf do not exists', async () => {
        await connectionMock
          .db('digital')
          .collection('user')
          .insertOne(userCreate1);
        const findResponse = await userModels.findByCpf('169.284.217-05');
        expect(findResponse).to.be.equal(false);
      });
    });

    describe('Testing find by account', () => {
      afterEach(async () => {});
      it('Should return the user if account exists', async () => {
        await connectionMock
          .db('digital')
          .collection('user')
          .insertOne({ ...userDb1 });
        const { name, password, cpf, wallet, account } =
          (await userModels.findByAccount('00001')) as IUserDb;

        expect({ name, password, cpf, wallet, account }).to.deep.equal(userDb1);
      });
      it('Should return empty if account do not exists', async () => {
        await connectionMock
          .db('digital')
          .collection('user')
          .insertOne({ ...userDb1 });
        const response = await userModels.findByAccount('00005');

        expect(response).to.be.equal(null);
      });
    });

    describe('Testing find and update counter', () => {
      afterEach(async () => {});
      it('Should update the counter on the accountCounter collection', async () => {
        await connectionMock
          .db('digital')
          .collection('accountCounter')
          .insertOne({ counter: 0 });
        const { value } = await userModels.findAndUpdateCounter();

        expect(value?.counter).to.be.equal(1);
      });
    });
  });

  describe('Testing banking models', () => {
    describe('Testing update one', () => {
      afterEach(async () => {});

      it('Should update using a filter and a query', async () => {
        await connectionMock.db('digital').collection('user').insertOne({...userDb1});
        const {modifiedCount} = await bankingModels.updateOne({...userDb1},{$inc:{wallet:100}});
        const findUser = await connectionMock.db('digital').collection('user').findOne({name:'Pedro'})
        expect(modifiedCount).to.be.equal(1);
        expect(findUser?.wallet).to.be.equal(100);
      });
    });
  });
});
