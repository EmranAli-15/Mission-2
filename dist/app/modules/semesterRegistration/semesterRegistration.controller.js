"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.semesterRegistrationControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const semesterRegistration_service_1 = require("./semesterRegistration.service");
const createSemesterRegistration = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const result = yield semesterRegistration_service_1.semesterRegistrationService.createSemesterRegistrationIntoDB(body);
    res.status(200).json({
        success: true,
        message: 'Semester registration is created successfully',
        data: result
    });
}));
const getAllSemesterRegistrations = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield semesterRegistration_service_1.semesterRegistrationService.getAllSemesterRegistrationsFromDB(req.query);
    res.status(200).json({
        success: true,
        message: 'Semester registration retrieve successfully.',
        data: result
    });
}));
const getSingleSemesterRegistration = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield semesterRegistration_service_1.semesterRegistrationService.getSingleSemesterRegistrationFromDB(id);
    res.status(200).json({
        success: true,
        message: 'Semester registration retrieve successfully.',
        data: result
    });
}));
const updateSemesterRegistration = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const body = req.body;
    const result = yield semesterRegistration_service_1.semesterRegistrationService.updateSemesterRegistrationIntoDB(id, body);
    res.status(200).json({
        success: true,
        message: 'Semester registration updated successfully.',
        data: result
    });
}));
exports.semesterRegistrationControllers = {
    createSemesterRegistration,
    getAllSemesterRegistrations,
    getSingleSemesterRegistration,
    updateSemesterRegistration
};
