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

export const semesterRegisterValidation = {
    createSemesterRegistrationValidation
};