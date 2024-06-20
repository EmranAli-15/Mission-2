"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidations = void 0;
const zod_1 = require("zod");
const loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string({ required_error: 'ID is required' }),
        password: zod_1.z.string({ required_error: 'PASSWORD is required' }),
    }),
});
const changePasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        oldPassword: zod_1.z.string({ required_error: 'old password is required' }),
        newPassword: zod_1.z.string({ required_error: 'PASSWORD is required' }),
    }),
});
exports.authValidations = {
    loginValidationSchema,
    changePasswordValidationSchema
};