"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicDepartmentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const academicDepartment_validation_1 = require("./academicDepartment.validation");
const academicDepartment_controller_1 = require("./academicDepartment.controller");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(academicDepartment_validation_1.academicDepartmentValidation.createDepartmentValidation), academicDepartment_controller_1.academicDepartmentController.createAcademicDepartment);
router.get('/', academicDepartment_controller_1.academicDepartmentController.getAllAcademicDepartments);
router.get('/:departmentId', academicDepartment_controller_1.academicDepartmentController.getSingleAcademicDepartment);
router.patch('/:departmentId', (0, validateRequest_1.default)(academicDepartment_validation_1.academicDepartmentValidation.updateDepartmentValidation), academicDepartment_controller_1.academicDepartmentController.updateAcademicDepartment);
exports.academicDepartmentRoutes = router;
