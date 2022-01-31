// const sinon = require('sinon');
// const { expect } = require('chai');
// const { MongoClient } = require('mongodb');
// const { default: userModels } = require('../models/userModels');
// const { MongoMemoryServer } = require('mongodb-memory-server');
import sinon from 'sinon';
import { expect } from 'chai';
import { MongoClient } from 'mongodb';
import userModels from '../models/userModels';
import getConnection from './mongo';
// import { getConnection } from './mongo';

describe('Testing user model', async () => {
  let connectionMock: MongoClient;
  before(async () => {
    connectionMock = await getConnection();
    // await connectionMock
    //   .db('digital')
    //   .collection('user')
    //   .insertOne({ name: 'pedro' });
    // sinon.stub(MongoClient, 'connect').returns(console.log('stubi'));

    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    // const a = await connectionMock.db('digital').collection('user').find({});
    // const b = await a.toArray();
    // console.log(b);
    // await connectionMock.db('digital').collection('user').drop();
  });

  describe('Testing user model create user', () => {
    describe('Correct data introduced', () => {
      it('Should return the user', async () => {
        const createResponse = await userModels.createUser({ name: 'maria' });
        const a = await connectionMock
          .db('digital')
          .collection('user')
          .find({});
        const b = await a.toArray();
        console.log(b);
        expect(createResponse.acknowledged).to.be.equal(true);
      });
      it('Should create the user', async () => {});
    });
  });
});
