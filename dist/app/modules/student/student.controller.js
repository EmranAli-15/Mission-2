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
exports.StudentControllers = void 0;
const student_service_1 = require("./student.service");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const getAllStudents = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield student_service_1.StudentService.getAllStudentsFromDB(query);
    res.status(200).json({
        success: true,
        message: 'Students are retrieved successfully',
        data: result,
    });
}));
const getAStudent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const studentId = req.params.studentId;
    const result = yield student_service_1.StudentService.getAStudentFromDB(studentId);
    res.status(200).json({
        success: true,
        message: 'Student retrieved successfully',
        data: result,
    });
}));
const updateStudent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const studentId = req.params.studentId;
    const student = req.body.student;
    const result = yield student_service_1.StudentService.updateStudentIntoDB(studentId, student);
    res.status(200).json({
        success: true,
        message: 'Student updated successfully',
        data: result
    });
}));
const deleteStudent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const studentId = req.params.studentId;
    const result = yield student_service_1.StudentService.deleteStudentFromDB(studentId);
    res.status(200).json({
        success: true,
        message: 'Student deleted successfully',
        data: result
    });
}));
exports.StudentControllers = {
    getAllStudents,
    getAStudent,
    deleteStudent,
    updateStudent
};
