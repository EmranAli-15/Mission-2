import QueryBuilder from "../../builder/QueryBuilder";
import { courseSearchableFields } from "./course.constant";
import { courseInterface } from "./course.interface";
import { courseModel } from "./course.model"

const createCourseIntoDB = async (payload: courseInterface) => {
    const result = await courseModel.create(payload);
    return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
    const courseQuery = new QueryBuilder(courseModel.find()
        .populate('preRequisiteCourses.course')
        , query)
        .search(courseSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields()

    const result = await courseQuery.modelQuery;
    return result;
};

const getSingleCourseFromDB = async (id: string) => {
    const result = await courseModel.findById(id).populate('preRequisiteCourses.course');
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