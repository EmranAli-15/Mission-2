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
exports.createAcademicSemester = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const academicSemester_service_1 = require("./academicSemester.service");
const createSemester = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_service_1.academicSemesterServices.createSemesterIntoDB(req.body);
    res.status(200).json({
        success: true,
        message: 'Academic semester created successfully',
        data: result,
    });
}));
const getAllSemesters = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_service_1.academicSemesterServices.getAllSemestersFromDB();
    res.status(200).json({
        success: true,
        message: 'Academic semester created successfully',
        data: result,
    });
}));
const getSingleSemester = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { semesterId } = req.params;
    const result = yield academicSemester_service_1.academicSemesterServices.getSingleSemesterFromDB(semesterId);
    res.status(200).json({
        success: true,
        message: 'Academic semester created successfully',
        data: result,
    });
}));
const updateSemester = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { semesterId } = req.params;
    const result = yield academicSemester_service_1.academicSemesterServices.updateSemesterIntoDB(semesterId, req.body);
    res.status(200).json({
        success: true,
        message: 'Academic semester created successfully',
        data: result,
    });
}));
exports.createAcademicSemester = {
    createSemester,
    getAllSemesters,
    getSingleSemester,
    updateSemester
};
