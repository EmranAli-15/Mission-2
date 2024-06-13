import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { authValidations } from './auth.validation';
import { loginUserController } from './auth.controller';
const router = express.Router();

router.post('/login', validateRequest(authValidations.loginValidationSchema), loginUserController.loginUser);

export const authRoutes = router;