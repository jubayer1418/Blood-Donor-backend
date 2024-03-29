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
exports.userService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../../config"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const hashPassword = yield bcrypt_1.default.hash(data.password, 12);
    const userData = {
        email: data.email,
        password: hashPassword,
        name: data.name,
        bloodType: data.bloodType,
        location: data.location,
    };
    const userProfileData = {
        bio: data.bio,
        age: data.age,
        lastDonationDate: data.lastDonationDate,
    };
    console.log(userData);
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const createUser = yield transactionClient.user.create({
            data: userData,
            select: {
                id: true,
                name: true,
                email: true,
                bloodType: true,
                location: true,
                availability: true,
                password: false,
                createdAt: true,
                updatedAt: true,
            },
        });
        const createdUserProfileData = yield transactionClient.userProfile.create({
            data: Object.assign(Object.assign({}, userProfileData), { userId: createUser.id }),
        });
        return Object.assign(Object.assign({}, createUser), { userProfile: createdUserProfileData });
    }));
    return result;
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: payload.email,
        },
    });
    if (!userData) {
        throw new Error("User not found");
    }
    const validPassword = yield bcrypt_1.default.compare(payload.password, userData.password);
    if (!validPassword) {
        throw new Error("Invalid password");
    }
    const jwtToken = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
    };
    const accessToken = jsonwebtoken_1.default.sign(jwtToken, config_1.default.jwt.jwt_secret, {
        expiresIn: config_1.default.jwt.expires_in,
    });
    return {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        accessToken: accessToken,
    };
});
exports.userService = {
    createUser,
    loginUser,
};
