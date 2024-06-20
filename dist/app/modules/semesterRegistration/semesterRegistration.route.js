"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.semesterRegistrationRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const semesterRegistration_validation_1 = require("./semesterRegistration.validation");
const semesterRegistration_controller_1 = require("./semesterRegistration.controller");
const route = express_1.default.Router();
route.post('/', (0, validateRequest_1.default)(semesterRegistration_validation_1.semesterRegisterValidation.createSemesterRegistrationValidation), semesterRegistration_controller_1.semesterRegistrationControllers.createSemesterRegistration);
route.get('/', semesterRegistration_controller_1.semesterRegistrationControllers.getAllSemesterRegistrations);
route.get('/:id', semesterRegistration_controller_1.semesterRegistrationControllers.getSingleSemesterRegistration);
route.patch('/:id', (0, validateRequest_1.default)(semesterRegistration_validation_1.semesterRegisterValidation.updateSemesterRegistrationValidation), semesterRegistration_controller_1.semesterRegistrationControllers.updateSemesterRegistration);
exports.semesterRegistrationRoutes = route;
