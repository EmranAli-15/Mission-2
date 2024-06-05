import { courseInterface } from "./course.interface";
import { courseModel } from "./course.model"

const createCourseIntoDB = async (payload: courseInterface) => {
    const result = await courseModel.create(payload);
    return result;
};

const getAllCoursesFromDB = async () => {
    const result = await courseModel.find();
    return result;
};

const getSingleCourseFromDB = async (id: string) => {
    const result = await courseModel.findById(id);
    return result;
};

const deleteCourseFromDB = async (id: string) => {
    const result = await courseModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;
};

export const courseServices = {
    createCourseIntoDB,
    getAllCoursesFromDB,
    getSingleCourseFromDB,
    deleteCourseFromDB
};