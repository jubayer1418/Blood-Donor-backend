"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const createUser = zod_1.z.object({
    bloodDoner: zod_1.z.object({
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
        bloodType: zod_1.z.nativeEnum(client_1.BloodType).optional(),
        location: zod_1.z.string({
            required_error: "location is required",
        }).optional(),
        lastDonationDate: zod_1.z
            .boolean({
            required_error: "lastDonationDate is required",
        })
            .optional(),
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
});
exports.userValidation = {
    createUser,
};
