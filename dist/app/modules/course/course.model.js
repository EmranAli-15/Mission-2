"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseFacultyModel = exports.courseModel = void 0;
const mongoose_1 = require("mongoose");
const preRequisiteCoursesSchema = new mongoose_1.Schema({
    course: {
        type: mongoose_1.Schema.ObjectId,
        ref: "Course",
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
});
const courseSchema = new mongoose_1.Schema({
    title: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    prefix: {
        type: String,
        trim: true,
        required: true,
    },
    code: {
        type: Number,
        trim: true,
        required: true,
    },
    credits: {
        type: Number,
        trim: true,
        required: true,
    },
    preRequisiteCourses: [preRequisiteCoursesSchema],
    isDeleted: {
        type: Boolean,
        default: false,
    }
});
const courseFacultySchema = new mongoose_1.Schema({
    course: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Course',
        unique: true
    },
    faculties: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'academicFaculty',
        }]
});
exports.courseModel = (0, mongoose_1.model)('Course', courseSchema);
exports.courseFacultyModel = (0, mongoose_1.model)('CourseFaculty', courseFacultySchema);
