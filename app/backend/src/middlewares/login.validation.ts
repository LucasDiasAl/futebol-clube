import { Response, Request, NextFunction } from 'express';
import loginJoi from '../utils/joiLogin';

export default class LoginValidation {
  public validateLogin = (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;
    const validUser = loginJoi.validate(user);
    if (validUser.error) return res.status(400).json({ message: 'All fields must be filled' });
    next();
  };
}
