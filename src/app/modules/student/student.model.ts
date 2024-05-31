import { Schema, model, connect } from 'mongoose';
import { Guardian, LocalGuardian, Student, UserName } from './student.interface';

const userNameSchema = new Schema<UserName>(
    {
        firstName: { type: String, required: true },
        middleName: { type: String, required: true },
        lastName: { type: String, required: true },
    }
);

const guardianSchema = new Schema<Guardian>(
    {
        fatherName: { type: String, required: true },
        fatherOccupation: { type: String, required: true },
        fatherContactNo: { type: String, required: true },
        motherName: { type: String, required: true },
        motherOccupation: { type: String, required: true },
        motherContactNo: { type: String, required: true },
    }
);

const localGuardianSchema = new Schema<LocalGuardian>(
    {
        name: { type: String, required: true },
        occupation: { type: String, required: true },
        contactNo: { type: String, required: true },
        address: { type: String, required: true },
    }
);

const studentSchema = new Schema<Student>({
    id: { type: String, required: true, unique: true },
    user: { type: Schema.Types.ObjectId, required: [true, 'User id is required'], unique: true, ref: 'User' },
    name: {
        type: userNameSchema,
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: true
    },
    dateOfBirth: { type: String },
    email: { type: String, required: true, unique: true },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
        type: String,
        enum: {
            values: ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"],
            message: "BLOOD IS REQUIRED BROH",
        },
        required: true,
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: {
        type: guardianSchema,
        required: true,
    },
    localGuardian: {
        type: localGuardianSchema,
        required: true,
    },
    admissionSemester: {
        type: Schema.ObjectId,
        required: true,
        ref: 'academicSemester'
    },
    academicDepartment: {
        type: Schema.ObjectId,
        required: true,
        ref: 'academicDepartment'
    },
    profileImg: { type: String },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

export const StudentModel = model<Student>('Student', studentSchema);