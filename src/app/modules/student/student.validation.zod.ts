import { z } from 'zod';

const userNameValidationSchema = z.object({
    firstName: z.string()
        .refine((str) => /^[A-Z][a-z]*$/.test(str), {
            message: 'First Name must start with an uppercase letter followed by lowercase letters',
        }),
    middleName: z.string(),
    lastName: z.string()
        .refine((str) => /^[A-Za-z]+$/.test(str), {
            message: 'Last Name must only contain alphabetic characters',
        }),
});

const guardianValidationSchema = z.object({
    fatherName: z.string().nonempty('Father\'s Name is required'),
    fatherOccupation: z.string().nonempty('Father\'s Occupation is required'),
    fatherContactNo: z.string().nonempty('Father\'s Contact Number is required'),
    motherName: z.string().nonempty('Mother\'s Name is required'),
    motherOccupation: z.string().nonempty('Mother\'s Occupation is required'),
    motherContactNo: z.string().nonempty('Mother\'s Contact Number is required'),
});

const localGuardianValidationSchema = z.object({
    name: z.string().nonempty('Local Guardian\'s Name is required'),
    occupation: z.string().nonempty('Local Guardian\'s Occupation is required'),
    contactNo: z.string().nonempty('Local Guardian\'s Contact Number is required'),
    address: z.string().nonempty('Local Guardian\'s Address is required'),
});

const studentValidationSchema = z.object({
    id: z.string().nonempty('ID is required'),
    name: userNameValidationSchema,
    gender: z.enum(['male', 'female', 'other'], {
        errorMap: () => ({ message: 'Gender must be one of male, female, or other' }),
    }),
    dateOfBirth: z.string().optional(),
    email: z.string().email('Email must be a valid email address').nonempty('Email is required'),
    contactNo: z.string().nonempty('Contact Number is required'),
    emergencyContactNo: z.string().nonempty('Emergency Contact Number is required'),
    bloodGroup: z.enum(['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'], {
        errorMap: () => ({ message: 'Blood Group must be one of A+, B+, AB+, O+, A-, B-, AB-, O-' }),
    }),
    presentAddress: z.string().nonempty('Present Address is required'),
    permanentAddress: z.string().nonempty('Permanent Address is required'),
    guardian: guardianValidationSchema,
    localGuardian: localGuardianValidationSchema,
    profileImg: z.string().optional(),
    isActive: z.enum(['active', 'blocked'], {
        errorMap: () => ({ message: 'Status must be either active or blocked' }),
    }).default('active'),
});

export { studentValidationSchema };
