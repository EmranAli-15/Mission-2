"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicDepartmentValidation = void 0;
const zod_1 = require("zod");
const createDepartmentValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ invalid_type_error: 'Academic department must be a string', required_error: 'Academic department required' }),
        academicFaculty: zod_1.z.string({ invalid_type_error: 'Academic faculty must be a string', required_error: 'Academic faculty required' })
    })
});
const updateDepartmentValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ invalid_type_error: 'Academic department must be a string', required_error: 'Academic department required' }).optional(),
        academicFaculty: zod_1.z.string({ invalid_type_error: 'Academic faculty must be a string', required_error: 'Academic faculty required' }).optional(),
    })
});
exports.academicDepartmentValidation = {
    createDepartmentValidation,
    updateDepartmentValidation
};
