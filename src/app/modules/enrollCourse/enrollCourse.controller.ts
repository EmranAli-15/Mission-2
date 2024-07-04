import catchAsync from "../../utils/catchAsync";
import { enrollCourseServices } from "./enrollCourse.service";

const createEnrollCourse = catchAsync(
    async(req, res) => {
        const result = await enrollCourseServices.createEnrollCourseIntoDB();

        res.status(200).json({
            success: true,
            message: 'Student is enrolled successfully',
            data: result
        })
    }
);


export const enrollCourseControllers = {
    createEnrollCourse
};