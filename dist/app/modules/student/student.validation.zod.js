"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentValidationSchema = void 0;
const zod_1 = require("zod");
const userNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z.string()
        .refine((str) => /^[A-Z][a-z]*$/.test(str), {
        message: 'First Name must start with an uppercase letter followed by lowercase letters',
    }),
    middleName: zod_1.z.string(),
    lastName: zod_1.z.string()
        .refine((str) => /^[A-Za-z]+$/.test(str), {
        message: 'Last Name must only contain alphabetic characters',
    }),
});
const guardianValidationSchema = zod_1.z.object({
    fatherName: zod_1.z.string().nonempty('Father\'s Name is required'),
    fatherOccupation: zod_1.z.string().nonempty('Father\'s Occupation is required'),
    fatherContactNo: zod_1.z.string().nonempty('Father\'s Contact Number is required'),
    motherName: zod_1.z.string().nonempty('Mother\'s Name is required'),
    motherOccupation: zod_1.z.string().nonempty('Mother\'s Occupation is required'),
    motherContactNo: zod_1.z.string().nonempty('Mother\'s Contact Number is required'),
});
const localGuardianValidationSchema = zod_1.z.object({
    name: zod_1.z.string().nonempty('Local Guardian\'s Name is required'),
    occupation: zod_1.z.string().nonempty('Local Guardian\'s Occupation is required'),
    contactNo: zod_1.z.string().nonempty('Local Guardian\'s Contact Number is required'),
    address: zod_1.z.string().nonempty('Local Guardian\'s Address is required'),
});
const studentValidationSchema = zod_1.z.object({
    id: zod_1.z.string().nonempty('ID is required'),
    name: userNameValidationSchema,
    gender: zod_1.z.enum(['male', 'female', 'other'], {
        errorMap: () => ({ message: 'Gender must be one of male, female, or other' }),
    }),
    dateOfBirth: zod_1.z.string().optional(),
    email: zod_1.z.string().email('Email must be a valid email address').nonempty('Email is required'),
    contactNo: zod_1.z.string().nonempty('Contact Number is required'),
    emergencyContactNo: zod_1.z.string().nonempty('Emergency Contact Number is required'),
    bloodGroup: zod_1.z.enum(['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'], {
        errorMap: () => ({ message: 'Blood Group must be one of A+, B+, AB+, O+, A-, B-, AB-, O-' }),
    }),
    presentAddress: zod_1.z.string().nonempty('Present Address is required'),
    permanentAddress: zod_1.z.string().nonempty('Permanent Address is required'),
    guardian: guardianValidationSchema,
    localGuardian: localGuardianValidationSchema,
    profileImg: zod_1.z.string().optional(),
    isActive: zod_1.z.enum(['active', 'blocked'], {
        errorMap: () => ({ message: 'Status must be either active or blocked' }),
    }).default('active'),
});
exports.studentValidationSchema = studentValidationSchema;
