import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { offeredCourseValidations } from './offeredCourse.validation';
import { offeredCourseController } from './offeredCourse.controller';
const route = express.Router();

route.use('/', validateRequest(offeredCourseValidations.createOfferedCourseValidationSchema), offeredCourseController.createOfferedCourse);

export const offeredCourseRoutes = route;