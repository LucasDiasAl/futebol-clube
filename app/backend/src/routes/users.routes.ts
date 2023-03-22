import { Router } from 'express';
import UsersController from '../controller/users.controller';
import LoginValidationMiddleware from '../middlewares/login.validation.Middleware';
import LoginRole from '../middlewares/login.Role.Middleware';

const router = Router();
const usersController = new UsersController();
const loginValidation = new LoginValidationMiddleware();
const loginRole = new LoginRole();

router.post('/', loginValidation.validateLogin, usersController.login);
router.get('/role', loginRole.userRole);

export default router;
