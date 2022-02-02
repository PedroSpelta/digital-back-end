import { expect } from 'chai';
import { Db, MongoClient } from 'mongodb';
import Sinon from 'sinon';
import userErrors from '../errors/userErrors';
import { connectToDatabase } from '../models/connection';
import userModels from '../models/userModels';
import userServices from '../services/userServices';

const testUser = {
  name: 'maria',
  cpf: '169.284.217-01',
  password: '123456',
};

describe('Testing user services', () => {
  describe('Testing create', () => {
    describe('In case user is not valid', () => {
      it('Should return an error if name is invalid', async () => {
        try {
          await userServices.create({
            name: 123 as any,
            cpf: '169.284.217-01',
            password: '123456',
          });
        } catch (err) {
          expect(err).to.deep.equal(userErrors.invalidInput);
        }
      });

      it('Should return an error if cpf is invalid', async () => {
        try {
          await userServices.create({
            name: 'maria',
            cpf: '169.284',
            password: '123456',
          });
        } catch (err) {
          expect(err).to.deep.equal(userErrors.invalidInput);
        }
      });

      it('Should return an error if password is invalid', async () => {
        try {
          await userServices.create({
            name: 'maria',
            cpf: '169.284.217-01',
            password: '123',
          });
        } catch (err) {
          expect(err).to.deep.equal(userErrors.invalidInput);
        }
      });
    });

    describe('In case user cpf is already registered', () => {
      let mongo;
      before(async () => {
        Sinon.stub(userModels, 'findByCpf').resolves(true);
      });
      after(() => {
        Sinon.restore();
      });
      it('Should return an error if user exists', async () => {
        try {
          await userServices.create(testUser);
        } catch (err) {
          expect(err).to.deep.equal(userErrors.alreadyRegistered);
        }
      });
    });

    describe('In case user is created', () => {
      let mongo: Db;
      before(async () => {
        mongo = await connectToDatabase();
        Sinon.stub(userModels, 'findByCpf').resolves(false);
      });
      after(() => {
        Sinon.restore();
      });
      it('Should create with a new account number', async () => {
        const beforeCounter =  await mongo.collection('accountCounter').findOne()
        await userServices.create(testUser);
        const afterCounter = await mongo.collection('accountCounter').findOne()
        expect(afterCounter?.counter).to.be.equal(beforeCounter?.counter + 1);
      });
      it('Should return true', async () => {
        const response = await userServices.create(testUser);
        expect(response).to.be.true;
      });
    });
  });

  describe('Testing login', () => {

  })
});
