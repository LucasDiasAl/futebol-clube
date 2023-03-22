import { Request, Response } from 'express';
import JWT from '../utils/JWTtoken';

export default class LoginRole {
  constructor(private _JWT: JWT = new JWT()) { }

  public userRole = (req: Request, res: Response) => {
    const { authorization } = req.headers;
    console.log(JSON.stringify(authorization));
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    const decodedData = this._JWT.decode(authorization);
    if (!decodedData.type) return res.status(401).json({ message: 'Token must be a valid token' });
    res.status(200).json(decodedData.payload);
  };
}
