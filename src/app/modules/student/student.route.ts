import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidations } from './student.validation.zod';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

// router.post('/create-student', StudentControllers.createStudent);

router.get('/', StudentControllers.getAllStudents);

router.get('/:studentId', auth(USER_ROLE.admin, USER_ROLE.faculty), StudentControllers.getAStudent);

router.patch('/:studentId', validateRequest(studentValidations.updateStudentValidationSchema), StudentControllers.updateStudent);

router.delete('/:studentId', StudentControllers.deleteStudent);

export const StudentRoutes = router;