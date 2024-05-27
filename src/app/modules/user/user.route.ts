import express, { NextFunction, Request, Response } from 'express';
import { userControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidations } from '../student/student.validation.zod';

const router = express.Router();

router.post('/create-student', validateRequest(studentValidations.StudentValidationSchema), userControllers.createStudent);

export const UserRoutes = router;