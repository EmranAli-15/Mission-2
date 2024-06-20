"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicFacultyModel = void 0;
const mongoose_1 = require("mongoose");
const academicFacultySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
});
exports.academicFacultyModel = (0, mongoose_1.model)('academicFaculty', academicFacultySchema);
