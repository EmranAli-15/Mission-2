"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminModel = void 0;
const mongoose_1 = require("mongoose");
const adminName = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
    },
    middleName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
});
const adminSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, required: [true, 'User id is required'], unique: true, ref: 'admin' },
    name: {
        type: adminName,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
});
exports.adminModel = (0, mongoose_1.model)('Admin', adminSchema);
