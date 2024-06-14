import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { authValidations } from './auth.validation';
import { loginUserController } from './auth.controller';
const router = express.Router();

router.post('/login', validateRequest(authValidations.loginValidationSchema), loginUserController.loginUser);

router.post('/change-password', validateRequest(authValidations.changePasswordValidationSchema), loginUserController.changePassword);

export const authRoutes = router;