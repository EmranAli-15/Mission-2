import { Schema, model } from "mongoose";
import { semesterRegistrationInterface } from "./semesterRegistration.interface";

const semesterRegistrationSchema = new Schema<semesterRegistrationInterface>({
    academicSemester: {
        type: Schema.Types.ObjectId,
        unique: true,
        required: true,
        ref: 'academicSemester',
    },
    status: {
        type: String,
        enum: ['UPCOMING', 'ONGOING', 'ENDED'],
        default: 'UPCOMING',
    },
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        required: true,
    },
    minCredit: {
        type: Number,
        default: 6,
    },
    maxCredit: {
        type: Number,
        default: 16,
    }
},
    {
        timestamps: true
    },
);

export const semesterRegistrationModel = model<semesterRegistrationInterface>('semesterRegistration', semesterRegistrationSchema);