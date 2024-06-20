"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.offeredCourseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const offeredCourse_validation_1 = require("./offeredCourse.validation");
const offeredCourse_controller_1 = require("./offeredCourse.controller");
const route = express_1.default.Router();
route.use('/', (0, validateRequest_1.default)(offeredCourse_validation_1.offeredCourseValidations.createOfferedCourseValidationSchema), offeredCourse_controller_1.offeredCourseController.createOfferedCourse);
exports.offeredCourseRoutes = route;
