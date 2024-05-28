import { z } from 'zod';


const academicSemesterValidation = z.object({
    body: z.object({
        name: z.enum(['Autumn', 'Summer', 'Fall'], { message: 'Name must be Autumn, Summer or Fall' }),
        code: z.enum(['01', '02', '03']),
        year: z.string(),
        startMonth: z.enum(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']),
        endMonth: z.enum(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']),
    })
});

const updateSemesterValidation = z.object({
    body: z.object({
        name: z.enum(['Autumn', 'Summer', 'Fall']).optional(),
        year: z.string().optional(),
        code: z.enum(['01', '02', '03']).optional(),
        startMonth: z.enum(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']).optional(),
        endMonth: z.enum(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']).optional(),
    }),
});

export const semesterValidations = {
    updateSemesterValidation,
    academicSemesterValidation
}