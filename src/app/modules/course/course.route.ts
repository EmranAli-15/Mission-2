import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { courseValidations } from './course.validation';
import { courseControllers } from './course.controller';

const router = express.Router();

router.post('/', validateRequest(courseValidations.createCourseValidationSchema), courseControllers.createCourse);

router.get('/:id', courseControllers.getSingleCourse);

router.get('/', courseControllers.getAllCourses);

router.put('/:courseId/assign-faculties', validateRequest(courseValidations.facultiesWithCourseValidation), courseControllers.assignWithCourseFaculties);

router.delete('/:courseId/remove-faculties', validateRequest(courseValidations.facultiesWithCourseValidation), courseControllers.removeWithCourseFaculties);

router.delete('/:id', courseControllers.deleteCourse);

router.patch('/:id', validateRequest(courseValidations.updateCourseValidationSchema), courseControllers.updateCourse);

export const courseRoutes = router;