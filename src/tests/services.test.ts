import { expect } from 'chai';
import { Db, MongoClient } from 'mongodb';
import Sinon from 'sinon';
import jwtToken from '../auth/token';
import userErrors from '../errors/userErrors';
import { connectToDatabase } from '../models/connection';
import userModels from '../models/userModels';
import userServices from '../services/userServices';

const testUser = {
  name: 'maria',
  cpf: '169.284.217-01',
  password: '123456',
};
const testLogin = {
  account: '10000',
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
        const beforeCounter = await mongo
          .collection('accountCounter')
          .findOne();
        await userServices.create(testUser);
        const afterCounter = await mongo.collection('accountCounter').findOne();
        expect(afterCounter?.counter).to.be.equal(beforeCounter?.counter + 1);
      });
      it('Should return true', async () => {
        const response = await userServices.create(testUser);
        expect(response).to.be.true;
      });
    });
  });

  describe('Testing login', () => {
    describe('In case login input is not valid', () => {
      it('Should return a error if account is invalid', async () => {
        try {
          await userServices.login({ account: '1', password: '123456' });
        } catch (err) {
          expect(err).to.be.equal(userErrors.invalidFormat);
        }
      });
      it('Should return a error if password is invalid', async () => {
        try {
          await userServices.login({ account: '00001', password: '123' });
        } catch (err) {
          expect(err).to.be.equal(userErrors.invalidFormat);
        }
      });
    });

    describe('In case user do not exists', () => {
      let mongo: Db;
      before(async () => {
        mongo = await connectToDatabase();
      });
      it('Should return a error if user not found', async () => {
        try {
          await userServices.login({ account: '10000', password: '123456' });
        } catch (err) {
          expect(err).to.be.equal(userErrors.wrongCredentials);
        }
      });
      it('Should return a error if password do not match', async () => {
        await mongo
          .collection('user')
          .insertOne({ account: '10000', password: '123456' });
        try {
          await userServices.login({ account: '10000', password: '123457' });
        } catch (err) {
          expect(err).to.be.equal(userErrors.wrongCredentials);
        }
      });
    });

    describe('In case input is correct', () => {
      before(() => {
        Sinon.stub(jwtToken, 'generateToken').returns('123');
      });
      after(()=> {
        Sinon.restore();
      })
      it('Should return a token if input is correct', async () => {
        const response = await userServices.login({...testLogin});
        expect(response).to.be.equal('123');
      });
    });
  });
});
