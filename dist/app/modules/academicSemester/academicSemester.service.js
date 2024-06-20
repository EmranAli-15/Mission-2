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
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicSemesterServices = void 0;
const academicSemester_model_1 = require("./academicSemester.model");
const getAllSemestersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_model_1.AcademicSemesterModel.find();
    return result;
});
const getSingleSemesterFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_model_1.AcademicSemesterModel.findById(id);
    return result;
});
const createSemesterIntoDB = (semester) => __awaiter(void 0, void 0, void 0, function* () {
    const semesterCodeMapper = {
        Autumn: '01',
        Summer: '02',
        Fall: '03',
    };
    if (semesterCodeMapper[semester.name] !== semester.code) {
        throw new Error('Invalid semester code!');
    }
    const result = yield academicSemester_model_1.AcademicSemesterModel.create(semester);
    return result;
});
const updateSemesterIntoDB = (id, semester) => __awaiter(void 0, void 0, void 0, function* () {
    const semesterCodeMapper = {
        Autumn: '01',
        Summer: '02',
        Fall: '03',
    };
    if (semester.name &&
        semester.code &&
        semesterCodeMapper[semester.name] !== semester.code) {
        throw new Error('Invalid Semester Code');
    }
    const result = yield academicSemester_model_1.AcademicSemesterModel.findOneAndUpdate({ _id: id }, semester, {
        new: true,
    });
    return result;
});
exports.academicSemesterServices = {
    createSemesterIntoDB,
    getAllSemestersFromDB,
    updateSemesterIntoDB,
    getSingleSemesterFromDB
};
