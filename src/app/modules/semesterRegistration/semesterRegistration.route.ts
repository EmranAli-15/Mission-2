import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { semesterRegisterValidation } from './semesterRegistration.validation';
import { semesterRegistrationControllers } from './semesterRegistration.controller';
const route = express.Router();

route.post('/', validateRequest(semesterRegisterValidation.createSemesterRegistrationValidation), semesterRegistrationControllers.createSemesterRegistration);

route.get('/', semesterRegistrationControllers.getAllSemesterRegistrations);

route.get('/:id', semesterRegistrationControllers.getSingleSemesterRegistration);

route.patch('/:id', validateRequest(semesterRegisterValidation.updateSemesterRegistrationValidation), semesterRegistrationControllers.updateSemesterRegistration)

export const semesterRegistrationRoutes = route;