import { z } from "zod";

const userNameSchema = z.object({
    firstName: z.string({ message: 'First name is required' }),
    middleName: z.string({ message: 'First name is required' }),
    lastName: z.string({ message: 'First name is required' }),
})

const adminValidationSchema = z.object({
    body: z.object({
        admin: z.object({
            name: userNameSchema,
            id: z.string().optional(),
            gender: z.enum(['male', 'female', 'other']).optional(),
            isDeleted: z.boolean().optional(),
        })
    })
});

const userNameUpdateSchema = z.object({
    firstName: z.string({ message: 'First name is required' }).optional(),
    middleName: z.string({ message: 'First name is required' }).optional(),
    lastName: z.string({ message: 'First name is required' }).optional(),
})

const adminUpdateValidationSchema = z.object({
    body: z.object({
        name: userNameUpdateSchema.partial(),
        id: z.string().optional(),
        gender: z.enum(['male', 'female', 'other']).optional().optional(),
        isDeleted: z.boolean().optional(),
    })
});


export const adminValidations = {
    adminValidationSchema,
    adminUpdateValidationSchema,
}

