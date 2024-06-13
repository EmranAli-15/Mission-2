import AppError from "../../errors/AppError";
import { academicDepartmentModel } from "../academicDepartment/academicDepartment.model";
import { academicFacultyModel } from "../academicFaculty/academicFaculty.model";
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model";
import { courseFacultyModel, courseModel } from "../course/course.model";
import { semesterRegistrationModel } from "../semesterRegistration/semesterRegistration.model";
import { offeredCourseInterface } from "./offeredCourse.interface";
import { offeredCourseModel } from "./offeredCourse.model";

const createOfferedCourseIntoDB = async (payload: offeredCourseInterface) => {
    const { semesterRegistration, academicSemester, academicDepartment, academicFaculty, course, faculty, section, days, startTime, endTime } = payload;

    const isSemesterRegistrationExist = await semesterRegistrationModel.findById(semesterRegistration);
    if (!isSemesterRegistrationExist) {
        throw new AppError(400, 'Semester registration not found!');
    };

    const semesterRegistrationId = isSemesterRegistrationExist.academicSemester;

    const isAcademicSemesterExist = await AcademicSemesterModel.findById(academicSemester);
    if (!isAcademicSemesterExist) {
        throw new AppError(400, 'Academic semester not found!');
    };

    const isAcademicDepartmentExist = await academicDepartmentModel.findById(academicDepartment);
    if (!isAcademicDepartmentExist) {
        throw new AppError(400, 'Academic department not found!');
    };

    const isAcademicFacultyExist = await academicFacultyModel.findById(academicFaculty);
    if (!isAcademicFacultyExist) {
        throw new AppError(400, 'Academic faculty not found!');
    };

    const isCourseExist = await courseModel.findById(course);
    if (!isCourseExist) {
        throw new AppError(400, 'Course not found!');
    };

    const isFacultyExist = await courseFacultyModel.findById(faculty);
    if (!isFacultyExist) {
        throw new AppError(400, 'Faculty not found!');
    };

    // check if the department in belong to the faculty

    const isDepartmentBelongToFaculty = await academicDepartmentModel.findOne(
        {
            academicFaculty,
            _id: academicDepartment
        }
    );
    if (!isDepartmentBelongToFaculty) {
        throw new AppError(400, `The ${isAcademicDepartmentExist.name} is not belong to the ${isAcademicFacultyExist.name}`);
    };

    // check if the offered course with same section is exist or not
    const isOfferedCourseExistWithSameSemesterRegistrationAndSection = await offeredCourseModel.findOne({
        semesterRegistration,
        course,
        section
    });

    if (isOfferedCourseExistWithSameSemesterRegistrationAndSection) {
        throw new AppError(400, 'The offered course with same section is already exist');
    }

    // get the schedules of the faculties
    const assignedSchedules = await offeredCourseModel.find(
        {
            semesterRegistration,
            faculty,
            days: { $in: days }
        }
    ).select('days startTime endTime');

    console.log(assignedSchedules);

    const newSchedule = {
        days, startTime, endTime
    };

    assignedSchedules.forEach((schedule) => {
        const existStartTime = new Date(`1970-01-01T${schedule.startTime}`);
        const existEndTime = new Date(`1970-01-01T${schedule.endTime}`);
        const newStartTime = new Date(`1970-01-01T${newSchedule.startTime}`);
        const newEndTime = new Date(`1970-01-01T${newSchedule.endTime}`);

        if (newStartTime < existEndTime && newEndTime > existStartTime) {
            throw new AppError(400, 'This faculty is not available at that time! choose another time or date');
        };
    })

    // const result = await offeredCourseModel.create({ ...payload, semesterRegistrationId });
    // return result;

    return null;
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