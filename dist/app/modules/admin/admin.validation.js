"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminValidations = void 0;
const zod_1 = require("zod");
const userNameSchema = zod_1.z.object({
    firstName: zod_1.z.string({ message: 'First name is required' }),
    middleName: zod_1.z.string({ message: 'First name is required' }),
    lastName: zod_1.z.string({ message: 'First name is required' }),
});
const adminValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        admin: zod_1.z.object({
            name: userNameSchema,
            id: zod_1.z.string().optional(),
            gender: zod_1.z.enum(['male', 'female', 'other']).optional(),
            isDeleted: zod_1.z.boolean().optional(),
        })
    })
});
const userNameUpdateSchema = zod_1.z.object({
    firstName: zod_1.z.string({ message: 'First name is required' }).optional(),
    middleName: zod_1.z.string({ message: 'First name is required' }).optional(),
    lastName: zod_1.z.string({ message: 'First name is required' }).optional(),
});
const adminUpdateValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: userNameUpdateSchema.partial(),
        id: zod_1.z.string().optional(),
        gender: zod_1.z.enum(['male', 'female', 'other']).optional().optional(),
        isDeleted: zod_1.z.boolean().optional(),
    })
});
exports.adminValidations = {
    adminValidationSchema,
    adminUpdateValidationSchema,
};
