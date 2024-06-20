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
exports.offeredCourseServices = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const academicDepartment_model_1 = require("../academicDepartment/academicDepartment.model");
const academicFaculty_model_1 = require("../academicFaculty/academicFaculty.model");
const academicSemester_model_1 = require("../academicSemester/academicSemester.model");
const course_model_1 = require("../course/course.model");
const semesterRegistration_model_1 = require("../semesterRegistration/semesterRegistration.model");
const offeredCourse_model_1 = require("./offeredCourse.model");
const createOfferedCourseIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { semesterRegistration, academicSemester, academicDepartment, academicFaculty, course, faculty, section, days, startTime, endTime } = payload;
    const isSemesterRegistrationExist = yield semesterRegistration_model_1.semesterRegistrationModel.findById(semesterRegistration);
    if (!isSemesterRegistrationExist) {
        throw new AppError_1.default(400, 'Semester registration not found!');
    }
    ;
    const semesterRegistrationId = isSemesterRegistrationExist.academicSemester;
    const isAcademicSemesterExist = yield academicSemester_model_1.AcademicSemesterModel.findById(academicSemester);
    if (!isAcademicSemesterExist) {
        throw new AppError_1.default(400, 'Academic semester not found!');
    }
    ;
    const isAcademicDepartmentExist = yield academicDepartment_model_1.academicDepartmentModel.findById(academicDepartment);
    if (!isAcademicDepartmentExist) {
        throw new AppError_1.default(400, 'Academic department not found!');
    }
    ;
    const isAcademicFacultyExist = yield academicFaculty_model_1.academicFacultyModel.findById(academicFaculty);
    if (!isAcademicFacultyExist) {
        throw new AppError_1.default(400, 'Academic faculty not found!');
    }
    ;
    const isCourseExist = yield course_model_1.courseModel.findById(course);
    if (!isCourseExist) {
        throw new AppError_1.default(400, 'Course not found!');
    }
    ;
    const isFacultyExist = yield course_model_1.courseFacultyModel.findById(faculty);
    if (!isFacultyExist) {
        throw new AppError_1.default(400, 'Faculty not found!');
    }
    ;
    // check if the department in belong to the faculty
    const isDepartmentBelongToFaculty = yield academicDepartment_model_1.academicDepartmentModel.findOne({
        academicFaculty,
        _id: academicDepartment
    });
    if (!isDepartmentBelongToFaculty) {
        throw new AppError_1.default(400, `The ${isAcademicDepartmentExist.name} is not belong to the ${isAcademicFacultyExist.name}`);
    }
    ;
    // check if the offered course with same section is exist or not
    const isOfferedCourseExistWithSameSemesterRegistrationAndSection = yield offeredCourse_model_1.offeredCourseModel.findOne({
        semesterRegistration,
        course,
        section
    });
    if (isOfferedCourseExistWithSameSemesterRegistrationAndSection) {
        throw new AppError_1.default(400, 'The offered course with same section is already exist');
    }
    // get the schedules of the faculties
    const assignedSchedules = yield offeredCourse_model_1.offeredCourseModel.find({
        semesterRegistration,
        faculty,
        days: { $in: days }
    }).select('days startTime endTime');
    console.log(assignedSchedules);
    const newSchedule = {
        days, startTime, endTime
    };
    assignedSchedules.forEach((schedule) => {
        const existStartTime = new Date(`1970-01-01T${schedule.startTime}`);
        const existEndTime = new Date(`1970-01-01T${schedule.endTime}`);
        const newStartTime = new Date(`1970-01-01T${newSchedule.startTime}`);
        const newEndTime = new Date(`1970-01-01T${newSchedule.endTime}`);
        if (newStartTime < existEndTime && newEndTime > existStartTime) {
            throw new AppError_1.default(400, 'This faculty is not available at that time! choose another time or date');
        }
        ;
    });
    // const result = await offeredCourseModel.create({ ...payload, semesterRegistrationId });
    // return result;
    return null;
});
const getAllOfferedCoursesFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
});
const getSingleOfferedCourseFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
});
const updateOfferedCourseIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.offeredCourseServices = {
    createOfferedCourseIntoDB,
    getAllOfferedCoursesFromDB,
    getSingleOfferedCourseFromDB,
    updateOfferedCourseIntoDB
};
