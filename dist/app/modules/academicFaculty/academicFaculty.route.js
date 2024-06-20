"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicFacultyRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const academicFaculty_validation_1 = require("./academicFaculty.validation");
const academicFaculty_controller_1 = require("./academicFaculty.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = (0, express_1.Router)();
router.post('/', (0, validateRequest_1.default)(academicFaculty_validation_1.academicFacultyValidation.createFacultyValidation), academicFaculty_controller_1.academicFacultyController.createAcademicFaculty);
router.get('/:facultyId', academicFaculty_controller_1.academicFacultyController.getSingleAcademicFaculty);
router.patch('/:facultyId', (0, validateRequest_1.default)(academicFaculty_validation_1.academicFacultyValidation.updateFacultyValidation), academicFaculty_controller_1.academicFacultyController.updateAcademicFaculty);
router.get('/', (0, auth_1.default)(), academicFaculty_controller_1.academicFacultyController.getAllAcademicFaculties);
exports.academicFacultyRoutes = router;
