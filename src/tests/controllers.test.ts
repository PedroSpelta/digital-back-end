import { expect } from 'chai';
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
  describe('Testing user controllers', () => {
    describe('Testing create', () => {
      describe('Testing correct input', () => {
        let status, json;
        let req: any = {};
        let res: any;
        let next: any;

        before(() => {
          status = Sinon.stub();
          json = Sinon.spy();
          res = { status, json };
          next = Sinon.stub();

          req.body = userCreate1;

          next.returns();
          status.returns(res);
          Sinon.stub(userServices, 'create').resolves(true);
        });

        after(() => {
          Sinon.restore();
        });

        it('Should return 201 and the user', async () => {
          const response = await userController.create(req, res, next);
          expect(res.status.calledWith(201)).to.be.true;
          expect(res.json.calledWith({ ...createdUser1 })).to.be.true;
        });
      });

      describe('Testing incorrect input', () => {
        let next: any;
        let req: any = {};
        let res: any;

        before(() => {
          next = Sinon.stub();
          req.body = {
            ...createdUser1,
            user: { ...createdUser1.user, password: '123' },
          };
          next.returns();
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
      describe('Testing correct input', () => {
        let status, json;
        let req: any = {};
        let res: any;
        let next: any;

        before(() => {
          status = Sinon.stub();
          json = Sinon.spy();
          res = { status, json };
          next = Sinon.stub();

          req.body = {
            account: '00001',
            password: '123456',
          };

          status.returns(res);
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

      describe('Testing incorrect input', () => {
        let req: any = {};
        let res: any;
        let next: any;

        before(() => {
          next = Sinon.stub();

          req.body = {
            account: '00001',
            password: '1234567',
          };

          next.returns();
        });

        after(() => {
          Sinon.restore();
        });

        it("Should call function next", async () => {
          await userController.login(req,res,next);
          expect(next.calledWith(userErrors.invalidFormat)).to.be.true;
        })
      });
      
    });
  });
});
