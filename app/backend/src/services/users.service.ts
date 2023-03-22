import * as bcrypt from 'bcryptjs';
import UsersModel from '../database/models/UsersModel';
import JWT from '../utils/JWTtoken';

type UserType = {
  email: string,
  password: string
};

type ResponseType = {
  type: string,
  status: number,
  message: string,
};
export default class UsersService {
  constructor(private usersModel = UsersModel, private jtwFuncs = new JWT()) { }

  public login = async (user: UserType): Promise<ResponseType> => {
    const foundUser = await this.usersModel.findOne({ where: { email: user.email } });
    if (!foundUser) return { type: 'error', status: 404, message: 'User not found' };
    const verifyPass = await bcrypt.compare(user.password, foundUser.password);
    if (verifyPass) {
      const token = this.jtwFuncs.encode({ id: foundUser.id, email: foundUser.email });
      return { type: 'sucess', status: 200, message: token };
    }
    return { type: 'error', status: 404, message: 'Incorrect Email or Password' };
  };
}
