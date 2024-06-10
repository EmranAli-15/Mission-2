import { z } from "zod";

const createSemesterRegistrationValidation = z.object({
    body: z.object({
        academicSemester: z.string(),
        status: z.enum(['UPCOMING', 'ONGOING', 'ENDED']),
        startDate: z.string(), //z.string().datetime()
        endDate: z.string(),
        minCredit: z.number().optional(),
        maxCredit: z.number().optional(),
    })
});

const updateSemesterRegistrationValidation = z.object({
    body: z.object({
        academicSemester: z.string().optional(),
        status: z.enum(['UPCOMING', 'ONGOING', 'ENDED']).optional(),
        startDate: z.string().optional(), //z.string().datetime()
        endDate: z.string().optional(),
        minCredit: z.number().optional(),
        maxCredit: z.number().optional(),
    })
});

export const semesterRegisterValidation = {
    createSemesterRegistrationValidation,
    updateSemesterRegistrationValidation
};