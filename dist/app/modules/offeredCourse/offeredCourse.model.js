"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.offeredCourseModel = void 0;
const mongoose_1 = require("mongoose");
const offeredCourseSchema = new mongoose_1.Schema({
    semesterRegistration: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'semesterRegistration'
    },
    academicSemester: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'academicSemester'
    },
    academicFaculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'academicFaculty'
    },
    academicDepartment: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'academicDepartment'
    },
    course: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Course'
    },
    faculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'academicFaculty'
    },
    maxCapacity: {
        type: Number,
        required: true
    },
    section: {
        type: Number,
        required: true
    },
    days: [{
            type: String,
            enum: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']
        }],
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
exports.offeredCourseModel = (0, mongoose_1.model)('offeredCourse', offeredCourseSchema);
