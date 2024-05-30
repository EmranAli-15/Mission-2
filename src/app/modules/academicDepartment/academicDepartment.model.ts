import { Schema, model } from "mongoose";
import { academicDepartmentInterface } from "./academicDepartment.interface";

const academicDepartmentSchema = new Schema<academicDepartmentInterface>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    academicFaculty: {
        type: Schema.Types.ObjectId,
        ref: 'Academic Faculty'
    }
},
    {
        timestamps: true
    });

export const academicDepartmentModel = model<academicDepartmentInterface>(
    'academicDepartment', academicDepartmentSchema
);