import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import * as process from 'process';

type payloadType = {
  id: number,
  email: string,
};
export default class JWT {
  public encode = (payload: payloadType): string => jwt.sign(
    payload,
    process.env.JWT_SECRET || 'jwt_secret',
  );
}
