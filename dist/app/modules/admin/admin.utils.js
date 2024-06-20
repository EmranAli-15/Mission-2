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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatedAdminId = void 0;
const user_model_1 = require("../user/user.model");
const findLastAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastAdminId = yield user_model_1.User.findOne({
        role: 'admin',
    }, {
        id: 1,
        _id: 0,
    }).sort({
        createdAt: -1,
    }).lean();
    return (lastAdminId === null || lastAdminId === void 0 ? void 0 : lastAdminId.id) ? lastAdminId.id : undefined;
});
const generatedAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    let currentId = (0).toString();
    const lastAdminId = yield findLastAdminId();
    const lastAdminIdCode = lastAdminId === null || lastAdminId === void 0 ? void 0 : lastAdminId.substring(2);
    if (lastAdminIdCode) {
        currentId = lastAdminIdCode.substring(2);
    }
    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
    incrementId = `A-${incrementId}`;
    return incrementId;
});
exports.generatedAdminId = generatedAdminId;
