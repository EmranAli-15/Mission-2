import catchAsync from "../../utils/catchAsync";
import { courseServices } from "./course.service";

const createCourse = catchAsync(
    async (req, res) => {
        const body = req.body;
        const result = await courseServices.createCourseIntoDB(body);

        res.status(200).json({
            success: true,
            message: 'Course created successfully',
            data: result,
        });
    }
);

const getAllCourses = catchAsync(
    async (req, res) => {
        const result = await courseServices.getAllCoursesFromDB(req.query);

        res.status(200).json({
            success: true,
            message: 'All courses are retrieved successfully',
            data: result,
        });
    }
);

const getSingleCourse = catchAsync(
    async (req, res) => {
        const { id } = req.params;
        const result = await courseServices.getSingleCourseFromDB(id);

        res.status(200).json({
            success: true,
            message: 'Course is retrieved successfully',
            data: result,
        });
    }
);

const deleteCourse = catchAsync(
    async (req, res) => {
        const { id } = req.params;
        const result = await courseServices.deleteCourseFromDB(id);

        res.status(200).json({
            success: true,
            message: 'Course is deleted successfully',
            data: result,
        });
    }
);

const updateCourse = catchAsync(
    async (req, res) => {
        const { id } = req.params;
        const body = req.body;
        const result = await courseServices.updateCourseIntoDB(id, body);

        res.status(200).json({
            success: true,
            message: 'Course is updated successfully',
            data: result,
        });
    }
)

export const courseControllers = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    deleteCourse,
    updateCourse
};