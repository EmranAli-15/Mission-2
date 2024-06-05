import { Schema, model } from "mongoose";
import { courseInterface, preRequisiteCourses } from "./course.interface";


const preRequisiteCoursesSchema = new Schema<preRequisiteCourses>({
    course: {
        type: Schema.ObjectId,
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
});


export const courseModel = model<courseInterface>('Course', courseSchema)