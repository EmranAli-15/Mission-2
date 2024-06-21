import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { authValidations } from './auth.validation';
import { loginUserController } from './auth.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
const router = express.Router();

router.post('/login', validateRequest(authValidations.loginValidationSchema), loginUserController.loginUser);

router.post('/change-password', auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student), validateRequest(authValidations.changePasswordValidationSchema), loginUserController.changePassword);

router.post('/refresh-token', validateRequest(authValidations.refreshTokenValidationSchema), loginUserController.refreshToken);

router.post('/forget-password', validateRequest(authValidations.forgetPasswordValidationSchema), loginUserController.forgetPassword);

export const authRoutes = router;