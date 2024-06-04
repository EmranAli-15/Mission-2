import express, { NextFunction, Request, Response } from 'express';
import { userControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidations } from '../student/student.validation.zod';
import { adminValidations } from '../admin/admin.validation';

const router = express.Router();

router.post('/create-student', validateRequest(studentValidations.StudentValidationSchema), userControllers.createStudent);
router.post('/create-admin', validateRequest(adminValidations.adminValidationSchema), userControllers.createAdmin);

export const UserRoutes = router;