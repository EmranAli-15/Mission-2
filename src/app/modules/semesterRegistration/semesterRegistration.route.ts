import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { semesterRegisterValidation } from './semesterRegistration.validation';
import { semesterRegistrationControllers } from './semesterRegistration.controller';
const route = express.Router();

route.post('/', validateRequest(semesterRegisterValidation.createSemesterRegistrationValidation), semesterRegistrationControllers.createSemesterRegistration);

export const semesterRegistrationRoutes = route;