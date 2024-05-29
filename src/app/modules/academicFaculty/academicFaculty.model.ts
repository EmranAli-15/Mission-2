import { Schema, model } from "mongoose";
import { academicInterface } from "./academicFaculty.interface";

const academicFacultySchema = new Schema<academicInterface>({
    name: {
        type: String,
        required: true,
        unique: true
    }
},
    {
        timestamps: true
    });

export const academicFacultyModel = model<academicInterface>(
    'academicFaculty', academicFacultySchema
);