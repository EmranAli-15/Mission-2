import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { academicFacultyValidation } from "./academicFaculty.validation";
import { academicFacultyController } from "./academicFaculty.controller";
import auth from "../../middlewares/auth";

const router = Router();

router.post('/', validateRequest(academicFacultyValidation.createFacultyValidation), academicFacultyController.createAcademicFaculty);

router.get('/:facultyId', academicFacultyController.getSingleAcademicFaculty);

router.patch('/:facultyId', validateRequest(academicFacultyValidation.updateFacultyValidation), academicFacultyController.updateAcademicFaculty);

router.get('/', auth(), academicFacultyController.getAllAcademicFaculties);

export const academicFacultyRoutes = router;