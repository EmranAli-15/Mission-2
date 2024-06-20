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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const course_constant_1 = require("./course.constant");
const course_model_1 = require("./course.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const createCourseIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.courseModel.create(payload);
    return result;
});
const getAllCoursesFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new QueryBuilder_1.default(course_model_1.courseModel.find()
        .populate('preRequisiteCourses.course'), query)
        .search(course_constant_1.courseSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield courseQuery.modelQuery;
    return result;
});
const getSingleCourseFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.courseModel.findById(id).populate('preRequisiteCourses.course');
    return result;
});
const updateCourseIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { preRequisiteCourses } = payload, courseRemainingData = __rest(payload, ["preRequisiteCourses"]);
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const updateBasicCourseInfo = yield course_model_1.courseModel.findByIdAndUpdate(id, courseRemainingData, {
            new: true,
            runValidators: true,
            session
        });
        if (!updateBasicCourseInfo) {
            throw new AppError_1.default(400, 'Failed to update course');
        }
        if (preRequisiteCourses && preRequisiteCourses.length > 0) {
            const deletePreRequisites = preRequisiteCourses.filter(ele => ele.course && ele.isDeleted).map(ele => ele.course);
            const deletedPreRequisitesCourses = yield course_model_1.courseModel.findByIdAndUpdate(id, {
                $pull: {
                    preRequisiteCourses: {
                        course: {
                            $in: deletePreRequisites
                        }
                    }
                }
            }, {
                new: true,
                runValidators: true,
                session
            });
            if (!deletedPreRequisitesCourses) {
                throw new AppError_1.default(400, 'Failed to update course');
            }
            const newPreRequisites = preRequisiteCourses.filter(ele => ele.course && !ele.isDeleted);
            const newPreRequisitesCourses = yield course_model_1.courseModel.findByIdAndUpdate(id, {
                $addToSet: {
                    preRequisiteCourses: { $each: newPreRequisites }
                }
            }, {
                new: true,
                runValidators: true,
                session
            });
            if (!newPreRequisitesCourses) {
                throw new AppError_1.default(400, 'Failed to update course');
            }
            ;
            const result = yield course_model_1.courseModel.find().populate('preRequisiteCourses.course');
            return result;
        }
        ;
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppError_1.default(400, 'Failed to update course');
    }
});
const deleteCourseFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.courseModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;
});
const assignFacultiesWithIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.courseFacultyModel.findByIdAndUpdate(id, {
        course: id,
        $addToSet: {
            faculties: { $each: payload }
        }
    }, {
        upsert: true,
        new: true
    });
    return result;
});
const removeFacultiesFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.courseFacultyModel.findByIdAndUpdate(id, {
        $pull: {
            faculties: { $in: payload }
        }
    }, {
        new: true
    });
    return result;
});
exports.courseServices = {
    createCourseIntoDB,
    getAllCoursesFromDB,
    getSingleCourseFromDB,
    updateCourseIntoDB,
    deleteCourseFromDB,
    assignFacultiesWithIntoDB,
    removeFacultiesFromDB
};
