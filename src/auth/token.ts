import { Algorithm, JwtPayload, sign, verify } from 'jsonwebtoken';
import bankingErrors from '../errors/bankingErrors';
import { ILoginReq } from '../types/user';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256' as Algorithm,
};
const JWT_SECRET = process.env.JWT_SECRET || 'super_duper_secret';

export const generateToken = (user: ILoginReq) => {
  return sign({ data: user }, JWT_SECRET, jwtConfig);
};

export const validateToken = (token: string) => {
  try{
    const data = verify(token, JWT_SECRET) as JwtPayload;
    return { ...data };
  } catch (err){
    throw bankingErrors.invalidToken;
  }

};

export default {
  generateToken,
  validateToken,
};
