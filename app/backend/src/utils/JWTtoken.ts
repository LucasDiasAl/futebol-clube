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

// const teste = async () => {
//   const team = new JWT();
//   console.log(await team.decode(
//     'eJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk1MDEwMTF9.ojk1xl4TgCwA-yhgRAtsO1TctXdMsEY5wdELaKLRCmY',
//   ));
// };
//
// teste();
