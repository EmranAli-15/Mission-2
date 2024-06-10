import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model";
import { semesterRegistrationInterface } from "./semesterRegistration.interface";
import { semesterRegistrationModel } from "./semesterRegistration.model";

const createSemesterRegistrationIntoDB = async (payload: semesterRegistrationInterface) => {
    const academicSemester = payload?.academicSemester;

    // check is there any 'upcoming' or 'ongoing' exist or not

    const isThereAnyUpcomingOrOngoing = await semesterRegistrationModel.findOne({
        $or: [
            {
                status: 'ONGOING',
            },
            {
                status: 'UPCOMING'
            }
        ]
    });

    if (isThereAnyUpcomingOrOngoing) {
        throw new AppError(400, `There is already a ${isThereAnyUpcomingOrOngoing.status} semester running`);
    };


    const isAcademicSemesterExists = await AcademicSemesterModel.findById(academicSemester)
    if (!isAcademicSemesterExists) {
        throw new AppError(400, 'This academic semester not found!');
    };

    const isSemesterRegistrationExits = await semesterRegistrationModel.findOne({ academicSemester });
    if (isSemesterRegistrationExits) {
        throw new AppError(400, 'This semester is already registered!');
    };

    const result = await semesterRegistrationModel.create(payload);
    return result;
};

const getAllSemesterRegistrationsFromDB = async (query: Record<string, unknown>) => {
    const semesterRegistrationQuery = new QueryBuilder(semesterRegistrationModel.find().populate('academicSemester'),
        query)
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await semesterRegistrationQuery.modelQuery;

    return result;
};

const getSingleSemesterRegistrationFromDB = async (id: string) => {
    const result = await semesterRegistrationModel.findById(id);

    return result;
};

const updateSemesterRegistrationIntoDB = async (id: string, payload: semesterRegistrationInterface) => {
    const requestedStatus = payload.status;

    // if the requested semester is 'ENDED', we will not updated it.

    const currentSemester = await semesterRegistrationModel.findById(id);
    const currentSemesterStatus = currentSemester?.status;

    if (!currentSemester) {
        throw new AppError(200, 'The semester not founded!!');
    };

    if (currentSemesterStatus === 'ENDED') {
        throw new AppError(200, 'The semester is already ENDED!');
    };

    // UPCOMING --> ONGOING --> ENDED

    if (currentSemesterStatus === 'UPCOMING' && requestedStatus === 'ENDED') {
        throw new AppError(400, 'You can not END the semester because the semester is UPCOMING!')
    };

    if (currentSemesterStatus === 'ONGOING' && requestedStatus === 'UPCOMING') {
        throw new AppError(400, 'You can not change the semester ONGOING to UPCOMING !')
    };

    const result = await semesterRegistrationModel.findByIdAndUpdate(id, { status: requestedStatus }, { new: true });

    return result;
};

export const semesterRegistrationService = {
    createSemesterRegistrationIntoDB,
    getAllSemesterRegistrationsFromDB,
    getSingleSemesterRegistrationFromDB,
    updateSemesterRegistrationIntoDB
}