import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidations } from './student.validation.zod';

const router = express.Router();

// router.post('/create-student', StudentControllers.createStudent);

router.get('/', StudentControllers.getAllStudents);

router.get('/:studentId', StudentControllers.getAStudent);

router.patch('/:studentId', validateRequest(studentValidations.updateStudentValidationSchema), StudentControllers.updateStudent);

router.delete('/:studentId', StudentControllers.deleteStudent);

export const StudentRoutes = router;