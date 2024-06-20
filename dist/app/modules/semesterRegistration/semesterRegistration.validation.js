"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.semesterRegisterValidation = void 0;
const zod_1 = require("zod");
const createSemesterRegistrationValidation = zod_1.z.object({
    body: zod_1.z.object({
        academicSemester: zod_1.z.string(),
        status: zod_1.z.enum(['UPCOMING', 'ONGOING', 'ENDED']),
        startDate: zod_1.z.string(), //z.string().datetime()
        endDate: zod_1.z.string(),
        minCredit: zod_1.z.number().optional(),
        maxCredit: zod_1.z.number().optional(),
    })
});
const updateSemesterRegistrationValidation = zod_1.z.object({
    body: zod_1.z.object({
        academicSemester: zod_1.z.string().optional(),
        status: zod_1.z.enum(['UPCOMING', 'ONGOING', 'ENDED']).optional(),
        startDate: zod_1.z.string().optional(), //z.string().datetime()
        endDate: zod_1.z.string().optional(),
        minCredit: zod_1.z.number().optional(),
        maxCredit: zod_1.z.number().optional(),
    })
});
exports.semesterRegisterValidation = {
    createSemesterRegistrationValidation,
    updateSemesterRegistrationValidation
};
