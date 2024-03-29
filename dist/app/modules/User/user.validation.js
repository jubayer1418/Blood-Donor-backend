"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const createUser = zod_1.z.object({
    name: zod_1.z.string({
        required_error: "Name is required!",
    }),
    email: zod_1.z
        .string({
        required_error: "Email is required!",
    })
        .email({
        message: "Email must be a valid email address.",
    }),
    password: zod_1.z.string({
        required_error: "Password is required",
    }),
    // .min(8, { message: "Password must be at least 8 characters long" })
    // .regex(
    //   /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{":;'?/>.<,])(?=.*[a-zA-Z]).{8,}$/,
    //   {
    //     message:
    //       "Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character",
    //   }
    // )
    bloodType: zod_1.z.string({
        required_error: "bloodType is required",
    }),
    location: zod_1.z.string({
        required_error: "location is required",
    }),
    age: zod_1.z.number({
        required_error: "age is required",
    }),
    bio: zod_1.z.string({
        required_error: "bio is required",
    }),
    lastDonationDate: zod_1.z.string({
        required_error: "lastDonationDate is required",
    }),
});
exports.userValidation = {
    createUser,
};
