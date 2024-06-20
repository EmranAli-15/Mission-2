"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.offeredCourseValidations = void 0;
const zod_1 = require("zod");
const createOfferedCourseValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        semesterRegistration: zod_1.z.string(),
        academicSemester: zod_1.z.string(),
        academicFaculty: zod_1.z.string(),
        academicDepartment: zod_1.z.string(),
        course: zod_1.z.string(),
        faculty: zod_1.z.string(),
        maxCapacity: zod_1.z.number(),
        section: zod_1.z.number(),
        days: zod_1.z.array(zod_1.z.enum(['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'])),
        startTime: zod_1.z.string().refine((time) => {
            const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
            return regex.test(time);
        }, {
            message: 'Invalid time format, expected "HH:MM in 24 hours format"'
        }),
        endTime: zod_1.z.string().refine((time) => {
            const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
            return regex.test(time);
        }, {
            message: 'Invalid time format, expected "HH:MM in 24 hours format"'
        })
    }).refine((body) => {
        const start = new Date(`1970-01-01T${body.startTime}`);
        const end = new Date(`1970-01-01T${body.endTime}`);
        return end > start;
    }, {
        message: 'Start time should be before end time'
    })
});
const updateOfferedCourseValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        faculty: zod_1.z.string().optional(),
        maxCapacity: zod_1.z.number().optional(),
        days: zod_1.z.enum(['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']).optional(),
        startTime: zod_1.z.string().optional(),
        endTime: zod_1.z.string().optional()
    })
});
exports.offeredCourseValidations = {
    createOfferedCourseValidationSchema,
    updateOfferedCourseValidationSchema
};
