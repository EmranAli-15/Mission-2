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

export const authValidations = {
    loginValidationSchema,
    changePasswordValidationSchema
};