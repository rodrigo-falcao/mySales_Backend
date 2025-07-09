import { ForgoPasswordSchema, ResetPasswordSchema } from '../schemas/PasswordSchemas';
import { Router } from 'express';
import ForgotPasswordControllers from '../controllers/ForgotPasswordControllers';
import ResetPasswordControllers from '../controllers/ResetPasswordControllers';

const passwordRoutes = Router();
const resetPasswordControllers = new ResetPasswordControllers();
const forgotPasswordControllers = new ForgotPasswordControllers();

passwordRoutes.post('/forgot',ForgoPasswordSchema, forgotPasswordControllers.create);
passwordRoutes.post('/reset',ResetPasswordSchema, resetPasswordControllers.create);


export default passwordRoutes;
