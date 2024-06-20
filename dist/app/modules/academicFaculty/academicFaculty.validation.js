"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicFacultyValidation = void 0;
const zod_1 = require("zod");
const createFacultyValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ invalid_type_error: 'Academic faculty must be a string' })
    })
});
const updateFacultyValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ invalid_type_error: 'Academic faculty must be a string' })
    })
});
exports.academicFacultyValidation = {
    createFacultyValidation,
    updateFacultyValidation
};
