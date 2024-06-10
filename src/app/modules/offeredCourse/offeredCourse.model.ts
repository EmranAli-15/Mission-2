import { Schema, model } from "mongoose";
import { offeredCourseInterface } from "./offeredCourse.interface";
import { number } from "zod";

const offeredCourseSchema = new Schema<offeredCourseInterface>({
    semesterRegistration: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'semesterRegistration'
    },
    academicSemester: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'academicSemester'
    },
    academicFaculty: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'academicFaculty'
    },
    academicDepartment: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'academicDepartment'
    },
    course: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Course'
    },
    faculty: {
        type: Schema.Types.ObjectId,
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
    days: {
        type: String,
        enum: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    });

export const offeredCourseModel = model<offeredCourseInterface>('offeredCourse', offeredCourseSchema);