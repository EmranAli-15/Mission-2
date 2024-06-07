import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { courseSearchableFields } from "./course.constant";
import { courseFacultyInterface, courseInterface } from "./course.interface";
import { courseFacultyModel, courseModel } from "./course.model"
import AppError from "../../errors/AppError";

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

const updateCourseIntoDB = async (id: string, payload: Partial<courseInterface>) => {
    const { preRequisiteCourses, ...courseRemainingData } = payload;

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const updateBasicCourseInfo = await courseModel.findByIdAndUpdate(id, courseRemainingData, {
            new: true,
            runValidators: true,
            session
        });

        if (!updateBasicCourseInfo) {
            throw new AppError(400, 'Failed to update course');
        }

        if (preRequisiteCourses && preRequisiteCourses.length > 0) {
            const deletePreRequisites = preRequisiteCourses.filter(ele => ele.course && ele.isDeleted).map(ele => ele.course);

            const deletedPreRequisitesCourses = await courseModel.findByIdAndUpdate(
                id,
                {
                    $pull: {
                        preRequisiteCourses: {
                            course: {
                                $in: deletePreRequisites
                            }
                        }
                    }
                },
                {
                    new: true,
                    runValidators: true,
                    session
                });

            if (!deletedPreRequisitesCourses) {
                throw new AppError(400, 'Failed to update course');
            }

            const newPreRequisites = preRequisiteCourses.filter(ele => ele.course && !ele.isDeleted);

            const newPreRequisitesCourses = await courseModel.findByIdAndUpdate(
                id,
                {
                    $addToSet: {
                        preRequisiteCourses: { $each: newPreRequisites }
                    }
                },
                {
                    new: true,
                    runValidators: true,
                    session
                });

            if (!newPreRequisitesCourses) {
                throw new AppError(400, 'Failed to update course');
            };

            const result = await courseModel.find().populate('preRequisiteCourses.course');

            return result;
        };

        await session.commitTransaction();
        await session.endSession();

    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(400, 'Failed to update course');
    }


};

const deleteCourseFromDB = async (id: string) => {
    const result = await courseModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;
};

const assignFacultiesWithIntoDB = async (id: string, payload: Partial<courseFacultyInterface>) => {
    const result = await courseFacultyModel.findByIdAndUpdate(
        id,
        {
            course: id,
            $addToSet: {
                faculties: { $each: payload }
            }
        },
        {
            upsert: true,
            new: true
        });

    return result;
};

const removeFacultiesFromDB = async (id: string, payload: Partial<courseFacultyInterface>) => {
    const result = await courseFacultyModel.findByIdAndUpdate(
        id,
        {
            $pull: {
                faculties: { $in: payload }
            }
        },
        {
            new: true
        });

    return result;
};

export const courseServices = {
    createCourseIntoDB,
    getAllCoursesFromDB,
    getSingleCourseFromDB,
    updateCourseIntoDB,
    deleteCourseFromDB,
    assignFacultiesWithIntoDB,
    removeFacultiesFromDB
};