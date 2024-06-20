"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const student_route_1 = require("./app/modules/student/student.route");
const user_route_1 = require("./app/modules/user/user.route");
const globalErrorHandler_1 = require("./app/middlewares/globalErrorHandler");
const academicSemester_route_1 = require("./app/modules/academicSemester/academicSemester.route");
const academicFaculty_route_1 = require("./app/modules/academicFaculty/academicFaculty.route");
const academicDepartment_route_1 = require("./app/modules/academicDepartment/academicDepartment.route");
const course_route_1 = require("./app/modules/course/course.route");
const semesterRegistration_route_1 = require("./app/modules/semesterRegistration/semesterRegistration.route");
const offeredCourse_route_1 = require("./app/modules/offeredCourse/offeredCourse.route");
const auth_route_1 = require("./app/modules/auth/auth.route");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
// /////////////////////////////////////////////////////
// ROUTERS
app.use('/api/v1/students', student_route_1.StudentRoutes);
app.use('/api/v1/users', user_route_1.UserRoutes);
app.use('/api/v1/academic-semester', academicSemester_route_1.AcademicSemesterRoutes);
app.use('/api/v1/academic-faculty', academicFaculty_route_1.academicFacultyRoutes);
app.use('/api/v1/academic-department', academicDepartment_route_1.academicDepartmentRoutes);
app.use('/api/v1/course', course_route_1.courseRoutes);
app.use('/api/v1/semester-registration', semesterRegistration_route_1.semesterRegistrationRoutes);
app.use('/api/v1/offered-course', offeredCourse_route_1.offeredCourseRoutes);
app.use('/api/v1/auth', auth_route_1.authRoutes);
// //////////////////////////////////////////////////////
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use((req, res, next) => {
    res.status(404).json({
        message: 'No route found',
    });
});
app.use(globalErrorHandler_1.globalErrorHandler);
exports.default = app;
