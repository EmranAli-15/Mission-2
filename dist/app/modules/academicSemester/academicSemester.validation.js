"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.semesterValidations = void 0;
const zod_1 = require("zod");
const academicSemesterValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.enum(['Autumn', 'Summer', 'Fall'], { message: 'Name must be Autumn, Summer or Fall' }),
        code: zod_1.z.enum(['01', '02', '03']),
        year: zod_1.z.string(),
        startMonth: zod_1.z.enum(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']),
        endMonth: zod_1.z.enum(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']),
    })
});
const updateSemesterValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.enum(['Autumn', 'Summer', 'Fall']).optional(),
        year: zod_1.z.string().optional(),
        code: zod_1.z.enum(['01', '02', '03']).optional(),
        startMonth: zod_1.z.enum(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']).optional(),
        endMonth: zod_1.z.enum(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']).optional(),
    }),
});
exports.semesterValidations = {
    updateSemesterValidation,
    academicSemesterValidation
};
