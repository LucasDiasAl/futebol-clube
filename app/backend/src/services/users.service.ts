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
  protected _invalidInputs = { type: 'error', status: 401, message: 'Invalid email or password' };
  constructor(private usersModel = UsersModel, private jtwFuncs = new JWT()) { }

  public login = async (user: UserType): Promise<ResponseType> => {
    const result = await this.usersModel.findOne({ where: { email: user.email } });
    const foundUser = result?.dataValues;
    if (!foundUser) return this._invalidInputs;
    const verifyPass = await bcrypt.compare(user.password, foundUser.password) || null;
    if (!verifyPass) return this._invalidInputs;
    const token = this.jtwFuncs.encode(
      { id: foundUser.id, email: foundUser.email, role: foundUser.role },
    );
    return { type: 'sucess', status: 200, message: token };
  };
}
