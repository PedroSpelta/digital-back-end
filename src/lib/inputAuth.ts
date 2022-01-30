import Joi from 'joi';
import { ILoginReq, IUserReq } from '../types/user';

const loginSchema = Joi.object({
  account: Joi.string().length(5).required(),
  password: Joi.string().length(6).required(),
});

const userSchema = Joi.object({
  name: Joi.string().required(),
  cpf: Joi.string().min(11).max(14).required(),
  password: Joi.string().length(6).required(),
});


export const loginAuth = (user:ILoginReq) => {
  return loginSchema.validate(user);
};

export const userAuth = (user:IUserReq) => {
  return userSchema.validate(user);
}

