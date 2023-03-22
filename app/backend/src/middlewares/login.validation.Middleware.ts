import { NextFunction, Request, Response } from 'express';
import loginJoi from '../utils/joiLogin';

export default class LoginValidationMiddleware {
  public validateLogin = (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;
    const { error } = loginJoi.validate(user);
    const type = error?.details[0].type || null;
    if (error && (type === 'string.empty' || type === 'any.required')) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (error) return res.status(401).json({ message: 'Invalid email or password' });
    next();
  };
}
// string.empty any.required
