import { expect } from 'chai';
import { afterEach } from 'mocha';
import Sinon from 'sinon';
import userController from '../controllers/userController';
import userErrors from '../errors/userErrors';
import userServices from '../services/userServices';

const userCreate1 = {
  name: 'maria',
  cpf: '169.284.217-02',
  password: '123456',
};

const createdUser1 = {
  message: 'User created successfully',
  user: {
    name: 'maria',
    cpf: '169.284.217-02',
    password: '123456',
  },
};

const mockToken = {
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImFjY291bnQiOiIwMDAwMSIsInBhc3N3b3JkIjoiMTIzNDU2In0sImlhdCI6MTY0Mzc3MDY1NSwiZXhwIjoxNjQ0Mzc1NDU1fQ.rlUJQjJwfpRdFp2fG_uJXOe8EqteaHDoyFg7-1UyLaQ',
};

describe('Testing controllers', () => {
  let status:any;
  let json:any;
  let req: any = {};
  let res: any;
  let next: any;
  beforeEach(() => {
    status = Sinon.stub();
    json = Sinon.stub();
    next = Sinon.stub();
    res = { status, json };
    next.returns();
    json.returns();
    status.returns(res);
  });
  
  describe('Testing user controllers', () => {
    describe('Testing create', () => {
      describe.only('Testing correct input', () => {
        before(() => {
          req.body = userCreate1;
          Sinon.stub(userServices, 'create').resolves(true);
        });

        after(() => {
          Sinon.restore();
        });

        it('Should express response with status 200', async () => {
          await userController.create(req, res, next);
          expect(res.status.calledWith(201)).to.be.true;
        });

        it('Should express response with json with user info', async () => {
          await userController.create(req, res, next);
          expect(res.json.calledWith({ ...createdUser1 })).to.be.true;
        });
      });

      describe.only('Testing incorrect input', () => {
        before(() => {
          req.body = {
            ...createdUser1,
            user: { ...createdUser1.user, password: '123' },
          };
        });

        after(() => {
          Sinon.restore();
        });

        it('Should receive wrong input and return to the function next', async () => {
          await userController.create(req, res, next);
          expect(
            next.calledWith({ status: 417, message: 'Name or cpf invalid' })
          );
        });
      });
    });

    describe('Testing login', () => {
      describe.only('Testing correct input', () => {
        before(() => {
          req.body = {
            account: '00001',
            password: '123456',
          };
          Sinon.stub(userServices, 'login').resolves(mockToken.token);
        });

        after(() => {
          Sinon.restore();
        });

        it('Should express response with status 200', async () => {
          await userController.login(req, res, next);
          expect(res.status.calledWith(200)).to.be.true;
        });

        it('Should express response with json token', async () => {
          await userController.login(req, res, next);
          expect(res.json.calledWith(mockToken)).to.be.true;
        });
      });

      describe.only('Testing incorrect input', () => {
        before(() => {
          req.body = {
            account: '00001',
            password: '1234567',
          };
        });

        after(() => {
          Sinon.restore();
        });

        it('Should receive wrong input and return to the function next', async () => {
          await userController.login(req, res, next);
          expect(next.calledWith(userErrors.invalidFormat)).to.be.true;
        });
      });
    });
  });

  describe('Testing banking controllers', () => {
    describe('Testing deposit', () => {
      describe('Testing correct input', () => {
        it('Should return express response with status 200');
      });
    });
  });
});
