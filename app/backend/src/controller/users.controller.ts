import { Response, Request } from 'express';
import UsersService from '../services/users.service';

export default class UsersController {
  constructor(private service: UsersService = new UsersService()) { }
  public login = async (req: Request, res: Response) => {
    try {
      const user = req.body;
      const { type, status, message } = await this.service.login(user);
      if (type === 'error') {
        return res.status(status).json({ message });
      }
      return res.status(status).json({ token: message });
    } catch (e) {
      return res.status(500).json({ message: e });
    }
  };
}
