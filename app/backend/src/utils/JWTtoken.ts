import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import * as process from 'process';
import joiJWT from './JoiJWT';

type payloadType = {
  id: number,
  email: string,
  role: string,
};
export default class JWT {
  public encode = (payload: payloadType): string => jwt.sign(
    payload,
    process.env.JWT_SECRET || 'jwt_secret',
  );

  public decode = (token: string) => {
    try {
      const validToken = joiJWT.validate(token);
      if (!validToken) return { type: null, payload: '' };
      const payload = jwt.verify(token, process.env.JWT_SECRET || 'jwt_secret');
      return { type: 'sucess', payload };
    } catch (error) {
      return { type: null, payload: '' };
    }
  };
}
