import { z } from "zod";

const createOfferedCourseValidationSchema = z.object({
    body: z.object({
        semesterRegistration: z.string(),
        academicSemester: z.string(),
        academicFaculty: z.string(),
        academicDepartment: z.string(),
        course: z.string(),
        faculty: z.string(),
        maxCapacity: z.number(),
        section: z.number(),
        days: z.array(z.enum(['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'])),
        startTime: z.string().refine(
            (time) => {
                const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
                return regex.test(time);
            },
            {
                message: 'Invalid time format, expected "HH:MM in 24 hours format"'
            }
        ),
        endTime: z.string().refine(
            (time) => {
                const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
                return regex.test(time);
            },
            {
                message: 'Invalid time format, expected "HH:MM in 24 hours format"'
            }
        )
    }).refine((body) => {
        const start = new Date(`1970-01-01T${body.startTime}`);

        const end = new Date(`1970-01-01T${body.endTime}`);

        return end > start;
    },
{
    message: 'Start time should be before end time'
})
});

const updateOfferedCourseValidationSchema = z.object({
    body: z.object({
        faculty: z.string().optional(),
        maxCapacity: z.number().optional(),
        days: z.enum(['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']).optional(),
        startTime: z.string().optional(),
        endTime: z.string().optional()
    })
});


export const offeredCourseValidations = {
    createOfferedCourseValidationSchema,
    updateOfferedCourseValidationSchema
}