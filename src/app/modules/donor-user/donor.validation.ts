import { z } from "zod";

const createDonor = z.object({
  donorId: z.string({
    required_error: "donorId is required!",
  }),
  phoneNumber: z.string({
    required_error: "phoneNumber is required!",
  }),
  dateOfDonation: z.string({
    required_error: "dateOfDonation is required",
  }),

  hospitalName: z.string({
    required_error: "hospitalName is required",
  }),
  hospitalAddress: z.string({
    required_error: "hospitalAddress is required",
  }),
  reason: z.string({
    required_error: "reason is required",
  }),
  time: z.string().min(1, { message: "Time is required." }),
  additionalInfo: z.string().optional(),
  termsAgreed: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions.",
  }),
});

export const DororValidation = {
  createDonor,
};
