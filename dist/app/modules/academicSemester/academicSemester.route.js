"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterRoutes = void 0;
const express_1 = __importDefault(require("express"));
const academicSemester_controller_1 = require("./academicSemester.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const academicSemester_validation_1 = require("./academicSemester.validation");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(academicSemester_validation_1.semesterValidations.academicSemesterValidation), academicSemester_controller_1.createAcademicSemester.createSemester);
router.get('/:semesterId', academicSemester_controller_1.createAcademicSemester.getSingleSemester);
router.patch('/:semesterId', (0, validateRequest_1.default)(academicSemester_validation_1.semesterValidations.updateSemesterValidation), academicSemester_controller_1.createAcademicSemester.updateSemester);
router.get('/', academicSemester_controller_1.createAcademicSemester.getAllSemesters);
exports.AcademicSemesterRoutes = router;
