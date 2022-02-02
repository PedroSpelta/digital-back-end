import { IExpressController } from '../types/express';
import userServices from '../services/userServices';
import { StatusCodes } from 'http-status-codes';

const create: IExpressController = async (req, res, next) => {
  try {
    const user = req.body;
    const createResponse = await userServices.create(user);
    
    const response = { message: 'User created successfully', user }    
    
    if (createResponse)
      return res
        .status(StatusCodes.CREATED)
        .json(response);
  } catch (err) {    
    next(err);
  }
};

const login: IExpressController = async (req, res, next) => {
  try{
    const {account, password} = req.body;
    const loginResponse = await userServices.login({account, password});
    return res.status(StatusCodes.OK).json({token:loginResponse})
  } catch (err) {
    next(err);
  }
}

export default { create, login };
