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
exports.authServices = void 0;
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_utils_1 = __importDefault(require("./auth.utils"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check if the user is exist
    const isUserExist = yield user_model_1.User.findOne({
        id: payload === null || payload === void 0 ? void 0 : payload.id
    });
    if (!isUserExist) {
        throw new AppError_1.default(400, 'User not FOUNDED!');
    }
    ;
    if ((isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.isDeleted) === true) {
        throw new AppError_1.default(400, 'User is DELETED!');
    }
    ;
    if ((isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.status) === 'blocked') {
        throw new AppError_1.default(403, 'User is BLOCKED!');
    }
    ;
    if ((isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password) !== payload.password) {
        throw new AppError_1.default(403, 'Password not matched!');
    }
    ;
    const jwtPayload = {
        userId: isUserExist.id,
        role: isUserExist.role
    };
    const accessToken = (0, auth_utils_1.default)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    const refreshToken = (0, auth_utils_1.default)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in);
    return {
        accessToken,
        refreshToken,
        needsPasswordChange: isUserExist.needsPasswordChange,
    };
});
const changePassword = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.User.findOne({
        id: user.userId,
        role: user.role
    });
    if (!isUserExist) {
        throw new AppError_1.default(400, 'User not FOUNDED!');
    }
    ;
    if ((isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.isDeleted) === true) {
        throw new AppError_1.default(400, 'User is DELETED!');
    }
    ;
    if ((isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.status) === 'blocked') {
        throw new AppError_1.default(403, 'User is BLOCKED!');
    }
    ;
    if ((isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password) !== payload.oldPassword) {
        throw new AppError_1.default(403, 'Password not matched!');
    }
    ;
    const result = yield user_model_1.User.findOneAndUpdate({
        id: user.userId,
        role: user.role
    }, {
        password: payload.newPassword,
        needsPasswordChange: false
    });
    if (!result) {
        throw new AppError_1.default(403, 'Something went wrong');
    }
    const jwtPayload = {
        userId: isUserExist.id,
        role: isUserExist.role
    };
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_access_secret, {
        expiresIn: '10d'
    });
    return null;
});
exports.authServices = {
    loginUser,
    changePassword
};
