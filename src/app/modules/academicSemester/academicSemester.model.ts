import { Error, Schema, model } from "mongoose";
import { AcademicSemester } from "./academicSemester.interface";

const academicSemesterSchema = new Schema<AcademicSemester>({
    name: {
        type: String,
        enum: ['Autumn', 'Summer', 'Fall'],
        required: true
    },
    code: {
        type: String,
        enum: ['01', '02', '03'],
        required: true
    },
    year: {
        type: String,
        required: true
    },
    startMonth: {
        type: String,
        enum: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',],
        required: true
    },
    endMonth: {
        type: String,
        enum: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',],
        required: true
    }
},
    {
        timestamps: true
    });

academicSemesterSchema.pre('save', async function (next) {
    const isSemesterExists = await AcademicSemesterModel.findOne({
        year: this.year,
        name: this.name
    });
    if (isSemesterExists) {
        throw new Error('Semester is already exist !');
    };
    next();
})

export const AcademicSemesterModel = model<AcademicSemester>('academicSemester', academicSemesterSchema);