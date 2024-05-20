import Joi from "joi";

const userNameValidationSchema = Joi.object({
    firstName: Joi.string().required().regex(/^[A-Z][a-z]*$/).messages({
        'string.pattern.base': '{#label} must start with an uppercase letter followed by lowercase letters',
        'any.required': 'First Name is required'
    }),
    middleName: Joi.string().optional().allow(''),
    lastName: Joi.string().required().pattern(new RegExp('^[A-Za-z]+$')).messages({
        'string.pattern.base': '{#label} must only contain alphabetic characters',
        'any.required': 'Last Name is required'
    }),
});

const guardianValidationSchema = Joi.object({
    fatherName: Joi.string().required().messages({
        'any.required': 'Father\'s Name is required'
    }),
    fatherOccupation: Joi.string().required().messages({
        'any.required': 'Father\'s Occupation is required'
    }),
    fatherContactNo: Joi.string().required().messages({
        'any.required': 'Father\'s Contact Number is required'
    }),
    motherName: Joi.string().required().messages({
        'any.required': 'Mother\'s Name is required'
    }),
    motherOccupation: Joi.string().required().messages({
        'any.required': 'Mother\'s Occupation is required'
    }),
    motherContactNo: Joi.string().required().messages({
        'any.required': 'Mother\'s Contact Number is required'
    }),
});

const localGuardianValidationSchema = Joi.object({
    name: Joi.string().required().messages({
        'any.required': 'Local Guardian\'s Name is required'
    }),
    occupation: Joi.string().required().messages({
        'any.required': 'Local Guardian\'s Occupation is required'
    }),
    contactNo: Joi.string().required().messages({
        'any.required': 'Local Guardian\'s Contact Number is required'
    }),
    address: Joi.string().required().messages({
        'any.required': 'Local Guardian\'s Address is required'
    }),
});



const studentValidationSchema = Joi.object({
    id: Joi.string().required().messages({
        'any.required': 'ID is required'
    }),
    name: userNameValidationSchema.required(),
    gender: Joi.string().valid('male', 'female', 'other').required().messages({
        'any.required': 'Gender is required',
        'any.only': 'Gender must be one of male, female, or other'
    }),
    dateOfBirth: Joi.string().optional().allow(''),
    email: Joi.string().email().required().messages({
        'any.required': 'Email is required',
        'string.email': 'Email must be a valid email address'
    }),
    contactNo: Joi.string().required().messages({
        'any.required': 'Contact Number is required'
    }),
    emergencyContactNo: Joi.string().required().messages({
        'any.required': 'Emergency Contact Number is required'
    }),
    bloodGroup: Joi.string().valid('A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-').required().messages({
        'any.required': 'Blood Group is required',
        'any.only': 'Blood Group must be one of A+, B+, AB+, O+, A-, B-, AB-, O-'
    }),
    presentAddress: Joi.string().required().messages({
        'any.required': 'Present Address is required'
    }),
    permanentAddress: Joi.string().required().messages({
        'any.required': 'Permanent Address is required'
    }),
    guardian: guardianValidationSchema.required(),
    localGuardian: localGuardianValidationSchema.required(),
    profileImg: Joi.string().optional().allow(''),
    isActive: Joi.string().valid('active', 'blocked').default('active').messages({
        'any.only': 'Status must be either active or blocked'
    }),
});

export default studentValidationSchema;