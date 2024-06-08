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
exports.DonorService = void 0;
const paginationHelper_1 = require("../../../helper/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const donor_constant_1 = require("./donor.constant");
const getAllFromDb = (param, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, sortBy, sortOrder, skip } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const { searchTerm, availability } = param, filterData = __rest(param, ["searchTerm", "availability"]);
    console.log(searchTerm);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: donor_constant_1.donorSearchAbleFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: "insensitive",
                },
            })),
        });
    }
    if (availability !== undefined) {
        andConditions.push({
            availability: undefined ||
                (availability == "Available" && true) ||
                (availability == "Unavailable" && false) ||
                (availability == "" && undefined),
        });
    }
    if (filterData.bloodType == "")
        delete filterData.bloodType;
    if (filterData.location == "")
        delete filterData.location;
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map((field) => ({
                [field]: {
                    equals: filterData[field],
                },
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.user.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: sortBy && sortOrder
            ? {
                [sortBy]: sortOrder,
            }
            : {
                createdAt: "desc",
            },
        include: {
            userProfile: true,
        },
    });
    const total = yield prisma_1.default.user.count({ where: whereConditions });
    return {
        meta: {
            page,
            limit,
            skip,
            total,
        },
        data: result,
    };
});
const postFromDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const already = yield prisma_1.default.request.findFirstOrThrow({
        where: {
            requesterId: id,
            donorId: payload.donorId,
        },
    });
    if (already) {
        throw new Error("Already Requested!");
    }
    const result = yield prisma_1.default.request.create({
        data: Object.assign(Object.assign({}, payload), { requesterId: id }),
        include: {
            donor: {
                include: {
                    userProfile: true,
                },
            },
            requester: {
                include: {
                    userProfile: true,
                },
            },
        },
    });
    return result;
});
const getFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.request.findMany({
        include: {
            requester: true,
            donor: true,
        },
    });
    return result;
});
const updateFromDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id, payload);
    yield prisma_1.default.request.findUniqueOrThrow({ where: { id } });
    const result = yield prisma_1.default.request.update({
        where: { id },
        data: { requestStatus: payload.status },
    });
    return result;
});
const getSingleFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findUniqueOrThrow({
        where: { id },
        include: {
            userProfile: true,
        },
    });
    console.log(result);
    return result;
});
const getFromMeDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("me", id);
    const result = yield prisma_1.default.request.findMany({
        where: { donorId: id },
        include: {
            requester: true,
            donor: true,
        },
    });
    console.log(result);
    return result;
});
const getFromMyRequestDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id);
    const result = yield prisma_1.default.request.findMany({
        where: { requesterId: id },
        include: {
            requester: true,
            donor: true,
        },
    });
    console.log(result);
    return result;
});
exports.DonorService = {
    getAllFromDb,
    postFromDb,
    getFromDb,
    updateFromDb,
    getSingleFromDb,
    getFromMeDb,
    getFromMyRequestDb,
};
