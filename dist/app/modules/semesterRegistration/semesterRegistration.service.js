"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.semesterRegistrationService = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const academicSemester_model_1 = require("../academicSemester/academicSemester.model");
const semesterRegistration_model_1 = require("./semesterRegistration.model");
const createSemesterRegistrationIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const academicSemester = payload === null || payload === void 0 ? void 0 : payload.academicSemester;
    // check is there any 'upcoming' or 'ongoing' exist or not
    const isThereAnyUpcomingOrOngoing = yield semesterRegistration_model_1.semesterRegistrationModel.findOne({
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
        throw new AppError_1.default(400, `There is already a ${isThereAnyUpcomingOrOngoing.status} semester running`);
    }
    ;
    const isAcademicSemesterExists = yield academicSemester_model_1.AcademicSemesterModel.findById(academicSemester);
    if (!isAcademicSemesterExists) {
        throw new AppError_1.default(400, 'This academic semester not found!');
    }
    ;
    const isSemesterRegistrationExits = yield semesterRegistration_model_1.semesterRegistrationModel.findOne({ academicSemester });
    if (isSemesterRegistrationExits) {
        throw new AppError_1.default(400, 'This semester is already registered!');
    }
    ;
    const result = yield semesterRegistration_model_1.semesterRegistrationModel.create(payload);
    return result;
});
const getAllSemesterRegistrationsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const semesterRegistrationQuery = new QueryBuilder_1.default(semesterRegistration_model_1.semesterRegistrationModel.find().populate('academicSemester'), query)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield semesterRegistrationQuery.modelQuery;
    return result;
});
const getSingleSemesterRegistrationFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield semesterRegistration_model_1.semesterRegistrationModel.findById(id);
    return result;
});
const updateSemesterRegistrationIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const requestedStatus = payload.status;
    // if the requested semester is 'ENDED', we will not updated it.
    const currentSemester = yield semesterRegistration_model_1.semesterRegistrationModel.findById(id);
    const currentSemesterStatus = currentSemester === null || currentSemester === void 0 ? void 0 : currentSemester.status;
    if (!currentSemester) {
        throw new AppError_1.default(200, 'The semester not founded!!');
    }
    ;
    if (currentSemesterStatus === 'ENDED') {
        throw new AppError_1.default(200, 'The semester is already ENDED!');
    }
    ;
    // UPCOMING --> ONGOING --> ENDED
    if (currentSemesterStatus === 'UPCOMING' && requestedStatus === 'ENDED') {
        throw new AppError_1.default(400, 'You can not END the semester because the semester is UPCOMING!');
    }
    ;
    if (currentSemesterStatus === 'ONGOING' && requestedStatus === 'UPCOMING') {
        throw new AppError_1.default(400, 'You can not change the semester ONGOING to UPCOMING !');
    }
    ;
    const result = yield semesterRegistration_model_1.semesterRegistrationModel.findByIdAndUpdate(id, { status: requestedStatus }, { new: true });
    return result;
});
exports.semesterRegistrationService = {
    createSemesterRegistrationIntoDB,
    getAllSemesterRegistrationsFromDB,
    getSingleSemesterRegistrationFromDB,
    updateSemesterRegistrationIntoDB
};
