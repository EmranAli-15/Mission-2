"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const course_validation_1 = require("./course.validation");
const course_controller_1 = require("./course.controller");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(course_validation_1.courseValidations.createCourseValidationSchema), course_controller_1.courseControllers.createCourse);
router.get('/:id', course_controller_1.courseControllers.getSingleCourse);
router.get('/', course_controller_1.courseControllers.getAllCourses);
router.put('/:courseId/assign-faculties', (0, validateRequest_1.default)(course_validation_1.courseValidations.facultiesWithCourseValidation), course_controller_1.courseControllers.assignWithCourseFaculties);
router.delete('/:courseId/remove-faculties', (0, validateRequest_1.default)(course_validation_1.courseValidations.facultiesWithCourseValidation), course_controller_1.courseControllers.removeWithCourseFaculties);
router.delete('/:id', course_controller_1.courseControllers.deleteCourse);
router.patch('/:id', (0, validateRequest_1.default)(course_validation_1.courseValidations.updateCourseValidationSchema), course_controller_1.courseControllers.updateCourse);
exports.courseRoutes = router;
