import express from 'express';
import { userControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidations } from '../student/student.validation.zod';
import { adminValidations } from '../admin/admin.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import { UserValidation } from './user.validation';
import { upload } from '../../utils/sendImgToCloudinary';

const router = express.Router();

router.post(
    '/create-student',
    auth(USER_ROLE.admin),
    upload.single('file'),
    (req, res, next) => {
        req.body = JSON.parse(req.body.data);
        next();
    },
    validateRequest(studentValidations.StudentValidationSchema),
    userControllers.createStudent);

router.post('/create-admin', validateRequest(adminValidations.adminValidationSchema), userControllers.createAdmin);

router.get('/me', auth('student', 'admin', 'faculty'), userControllers.getMe);

router.patch('/change-status/:id', auth('admin'), validateRequest(UserValidation.changeStatusValidationSchema), userControllers.changeStatus);

export const UserRoutes = router;