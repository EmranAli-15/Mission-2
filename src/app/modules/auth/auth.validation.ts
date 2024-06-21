import { z } from "zod";

const loginValidationSchema = z.object({
    body: z.object({
        id: z.string({ required_error: 'ID is required' }),
        password: z.string({ required_error: 'PASSWORD is required' }),
    }),
});

const changePasswordValidationSchema = z.object({
    body: z.object({
        oldPassword: z.string({ required_error: 'old password is required' }),
        newPassword: z.string({ required_error: 'PASSWORD is required' }),
    }),
});

const refreshTokenValidationSchema = z.object({
    cookies: z.object({
        refreshToken: z.string({ required_error: 'Refresh Token is required' })
    })
});

const forgetPasswordValidationSchema = z.object({
    body: z.object({
        id: z.string({ required_error: 'User id is required' })
    })
});

const resetPasswordValidationSchema = z.object({
    body: z.object({
        id: z.string({ required_error: 'User id is required' }),
        newPassword: z.string({ required_error: 'User password is required' }),
    })
});

export const authValidations = {
    loginValidationSchema,
    changePasswordValidationSchema,
    refreshTokenValidationSchema,
    forgetPasswordValidationSchema,
    resetPasswordValidationSchema
};

// http://localhost:3000/?id=A-0001&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJBLTAwMDEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTg5ODI3NzEsImV4cCI6MTcxODk4MzM3MX0.cnPD1lGXcifzBnPOB4ZuYduyMS1klh2x7-FxLHxh0uY