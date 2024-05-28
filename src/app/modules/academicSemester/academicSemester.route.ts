import express from 'express';
import { createAcademicSemester } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { semesterValidations } from './academicSemester.validation';

const router = express.Router();

router.post('/', validateRequest(semesterValidations.academicSemesterValidation), createAcademicSemester.createSemester);
router.get('/:semesterId', createAcademicSemester.getSingleSemester,);

router.patch('/:semesterId', validateRequest(semesterValidations.updateSemesterValidation), createAcademicSemester.updateSemester,);

router.get('/', createAcademicSemester.getAllSemesters);


export const AcademicSemesterRoutes = router;