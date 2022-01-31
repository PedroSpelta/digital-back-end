import sinon from 'sinon';
import { expect } from 'chai';
import { MongoClient } from 'mongodb';
import userModels from '../models/userModels';
import getConnection from './mongo';
import { afterEach } from 'mocha';
import bankingModels from '../models/bankingModels';

const userCreate1 = { name: 'Pedro', cpf: '169.284.217-01', password: '123456' };
const userCreate2 = { name: 'Maria', cpf: '169.284.217-02', password: '123456' };
const userDb1 = { name: 'Pedro', cpf: '169.284.217-01', password: '123456', account: '00001', wallet: 0};
const userDb2 = { name: 'Maria', cpf: '169.284.217-02', password: '123456', account: '00002', wallet: 0};

interface IUserDb {
  name:string;
  account: string;
  cpf: string;
  password:string;
  wallet: number;
}


describe('Testing user model', async () => {
  let connectionMock: MongoClient;
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });
  after(async () => {
    await connectionMock.close();
    sinon.restore();
  });

  describe('Testing create model', () => {
    afterEach(async () => {
      await connectionMock.db('digital').collection('user').drop();
    });
    it('Should create the user', async () => {
      const createResponse = await userModels.createUser(userCreate1);
      const findResponse = await connectionMock
        .db('digital')
        .collection('user')
        .findOne(userCreate1);
      expect(findResponse?.name).to.be.equal(userCreate1.name);
    });
    it('Should return acknowledged', async () => {
      const createResponse = await userModels.createUser(userCreate2);
      const { acknowledged } = createResponse;
      expect(acknowledged).to.be.equal(true);
    });
  });

  describe('Testing find by cpf', () => {
    afterEach(async () => {
      await connectionMock.db('digital').collection('user').drop();
    });
    it('Should return true if cpf exists', async () => {
      await connectionMock.db('digital').collection('user').insertOne(userCreate1);
      const findResponse = await userModels.findByCpf('169.284.217-01');
      expect(findResponse).to.be.equal(true);
    });
    it('Should return false if cpf do not exists', async () => {
      await connectionMock.db('digital').collection('user').insertOne(userCreate1);
      const findResponse = await userModels.findByCpf('169.284.217-05');
      expect(findResponse).to.be.equal(false);
    });
  });

  describe('Testing find by account', () => {
    afterEach(async () => {
      await connectionMock.db('digital').collection('user').drop();
    });
    it('Should return the user if account exists', async () => {
      await connectionMock.db('digital').collection('user').insertOne({...userDb1});
      const {name, password, cpf, wallet, account} = await userModels.findByAccount('00001') as IUserDb;
      
      expect({name, password, cpf, wallet, account}).to.deep.equal(userDb1);
    });
    it('Should return empty if account do not exists', async () => {
      await connectionMock.db('digital').collection('user').insertOne({...userDb1});
      const response = await userModels.findByAccount('00005');

      expect(response).to.be.equal(null);
    });
  });

  describe('Testing find and update counter', () => {
    afterEach(async () => {
      await connectionMock.db('digital').collection('accountCounter').drop();
    });
    it('Should update the counter on the accountCounter collection', async () => {
      await connectionMock.db('digital').collection('accountCounter').insertOne({counter:0});
      const {value} = await userModels.findAndUpdateCounter();
      
      expect(value?.counter).to.be.equal(1);
    });
  });
});

describe('Testing banking models', () => {
  let connectionMock: MongoClient;
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });
  after(async () => {
    await connectionMock.close();
  });

  describe('Testing update one', () => {
    afterEach(async () => {
      await connectionMock.db('digital').collection('user').drop();
    });

    it('Should update using a filter and a query', async() => {
      await connectionMock.db('digital').collection('user').insertOne({...userDb1});
      const findUser = await connectionMock.db('digital').collection('user').findOne({name:'Pedro'})
      console.log(findUser);
      
      const {modifiedCount} = await bankingModels.updateOne({...userDb1},{$inc:{wallet:100}})
      
      expect(modifiedCount).to.be.equal(1);
      expect(findUser?.wallet).to.be.equal(100);
    })
  })
});
