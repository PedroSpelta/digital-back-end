import { Algorithm, JwtPayload, sign, verify } from 'jsonwebtoken';
import { ILoginReq } from '../types/user';

const jwtConfig = {
  expiresIn: '30m',
  algorithm: 'HS256' as Algorithm,
};
const JWT_SECRET = process.env.JWT_SECRET || 'super_duper_secret';

export const generateToken = (user: ILoginReq) => {
  return sign({ data: user }, JWT_SECRET, jwtConfig);
};

export const validateToken = (token: string) => {
  const data = verify(token, JWT_SECRET) as JwtPayload;

  return { ...data };
};
