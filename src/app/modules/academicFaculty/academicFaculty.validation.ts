import { z } from "zod";

const createFacultyValidation = z.object({
    body: z.object({
        name: z.string({ invalid_type_error: 'Academic faculty must be a string' })
    })
});

const updateFacultyValidation = z.object({
    body: z.object({
        name: z.string({ invalid_type_error: 'Academic faculty must be a string' })
    })
});

export const academicFacultyValidation = {
    createFacultyValidation,
    updateFacultyValidation
}