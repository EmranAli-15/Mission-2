"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.semesterRegistrationModel = void 0;
const mongoose_1 = require("mongoose");
const semesterRegistrationSchema = new mongoose_1.Schema({
    academicSemester: {
        type: mongoose_1.Schema.Types.ObjectId,
        unique: true,
        required: true,
        ref: 'academicSemester',
    },
    status: {
        type: String,
        enum: ['UPCOMING', 'ONGOING', 'ENDED'],
        default: 'UPCOMING',
    },
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        required: true,
    },
    minCredit: {
        type: Number,
        default: 6,
    },
    maxCredit: {
        type: Number,
        default: 16,
    }
}, {
    timestamps: true
});
exports.semesterRegistrationModel = (0, mongoose_1.model)('semesterRegistration', semesterRegistrationSchema);
