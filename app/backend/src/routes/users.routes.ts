import { Router } from 'express';
import UsersController from '../controller/users.controller';
import LoginValidation from '../middlewares/login.validation';

const router = Router();
const usersController = new UsersController();
const loginValidation = new LoginValidation();

router.post('/', loginValidation.validateLogin, usersController.login);

export default router;
