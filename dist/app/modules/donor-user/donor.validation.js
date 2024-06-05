"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DororValidation = void 0;
const zod_1 = require("zod");
const createDonor = zod_1.z.object({
    donorId: zod_1.z.string({
        required_error: "donorId is required!",
    }),
    phoneNumber: zod_1.z.string({
        required_error: "phoneNumber is required!",
    }),
    dateOfDonation: zod_1.z.string({
        required_error: "dateOfDonation is required",
    }),
    hospitalName: zod_1.z.string({
        required_error: "hospitalName is required",
    }),
    hospitalAddress: zod_1.z.string({
        required_error: "hospitalAddress is required",
    }),
    reason: zod_1.z.string({
        required_error: "reason is required",
    }),
    time: zod_1.z.string().min(1, { message: "Time is required." }),
    additionalInfo: zod_1.z.string().optional(),
    termsAgreed: zod_1.z.boolean().refine((val) => val === true, {
        message: "You must agree to the terms and conditions.",
    }),
});
exports.DororValidation = {
    createDonor,
};
