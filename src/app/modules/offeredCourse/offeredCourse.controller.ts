import catchAsync from "../../utils/catchAsync";
import { offeredCourseServices } from "./offeredCourse.service";

const createOfferedCourse = catchAsync(
    async (req, res) => {
        const result = await offeredCourseServices.createOfferedCourseIntoDB(req.body);

        res.status(200).json({
            success: true,
            message: 'Offered course is created successfully!',
            data: result
        })
    }
);


export const offeredCourseController = {
    createOfferedCourse
}