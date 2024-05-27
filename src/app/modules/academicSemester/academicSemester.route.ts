import express from 'express';
import { createAcademicSemester } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import academicSemesterValidation from './academicSemester.validation';

const router = express.Router();

router.post('/', validateRequest(academicSemesterValidation), createAcademicSemester.createSemester);


export const AcademicSemesterRoutes = router;