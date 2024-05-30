import { z } from "zod";

const createDepartmentValidation = z.object({
    body: z.object({
        name: z.string({ invalid_type_error: 'Academic department must be a string', required_error: 'Academic department required' }),
        academicFaculty: z.string({ invalid_type_error: 'Academic faculty must be a string', required_error: 'Academic faculty required' })
    })
});

const updateDepartmentValidation = z.object({
    body: z.object({
        name: z.string({ invalid_type_error: 'Academic department must be a string', required_error: 'Academic department required' }).optional(),
        academicFaculty: z.string({ invalid_type_error: 'Academic faculty must be a string', required_error: 'Academic faculty required' }).optional(),
    })
});

export const academicDepartmentValidation = {
    createDepartmentValidation,
    updateDepartmentValidation
}