import { Schema, model } from "mongoose";
import { courseFacultyInterface, courseInterface, preRequisiteCourses } from "./course.interface";


const preRequisiteCoursesSchema = new Schema<preRequisiteCourses>({
    course: {
        type: Schema.ObjectId,
        ref: "Course",
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
})

const courseSchema = new Schema<courseInterface>({
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

const courseFacultySchema = new Schema<courseFacultyInterface>({
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        unique: true
    },
    faculties: [{
        type: Schema.Types.ObjectId,
        ref: 'academicFaculty',
    }]
});


export const courseModel = model<courseInterface>('Course', courseSchema);

export const courseFacultyModel = model<courseFacultyInterface>('CourseFaculty', courseFacultySchema);