import { NextFunction, Request, Response } from 'express';
import JWT from '../utils/JWTtoken';

export default class TokenValid {
  constructor(private _JWT: JWT = new JWT()) {
  }

  public tokenValidation = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    const decodedData = this._JWT.decode(authorization);
    if (!decodedData.type) return res.status(401).json({ message: 'Token must be a valid token' });
    next();
  };
}
