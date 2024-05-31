import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicDepartmentValidation } from './academicDepartment.validation';
import { academicDepartmentController } from './academicDepartment.controller';

const router = express.Router();

router.post('/', validateRequest(academicDepartmentValidation.createDepartmentValidation), academicDepartmentController.createAcademicDepartment);

router.get('/', academicDepartmentController.getAllAcademicDepartments);

router.get('/:departmentId', academicDepartmentController.getSingleAcademicDepartment);

router.patch('/:departmentId', validateRequest(academicDepartmentValidation.updateDepartmentValidation), academicDepartmentController.updateAcademicDepartment);

export const academicDepartmentRoutes = router;