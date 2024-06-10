import { offeredCourseInterface } from "./offeredCourse.interface";
import { offeredCourseModel } from "./offeredCourse.model";

const createOfferedCourseIntoDB = async (payload: offeredCourseInterface) => {
    const result = await offeredCourseModel.create(payload);
    return result;
};

const getAllOfferedCoursesFromDB = async (query: Record<string, unknown>) => {

};

const getSingleOfferedCourseFromDB = async (id: string) => {

}

const updateOfferedCourseIntoDB = async (id: string, payload: Partial<offeredCourseInterface>) => {

}


export const offeredCourseServices = {
    createOfferedCourseIntoDB,
    getAllOfferedCoursesFromDB,
    getSingleOfferedCourseFromDB,
    updateOfferedCourseIntoDB
}