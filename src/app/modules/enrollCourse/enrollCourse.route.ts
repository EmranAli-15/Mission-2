import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { enrolledCourseValidations } from './enrollCourse.validation';
import { enrollCourseControllers } from './enrollCourse.controller';

const router = express.Router();

router.post('/create-enroll-course', validateRequest(enrolledCourseValidations.createEnrolledCourseValidationZodSchema), enrollCourseControllers.createEnrollCourse);


export const enrollCourseRoutes = router;