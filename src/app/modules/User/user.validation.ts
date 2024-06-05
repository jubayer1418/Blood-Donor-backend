import { BloodType } from "@prisma/client";
import { z } from "zod";

const createUser = z.object({
  bloodDoner: z.object({
    name: z.string({
      required_error: "Name is required!",
    }),
    email: z
      .string({
        required_error: "Email is required!",
      })
      .email({
        message: "Email must be a valid email address.",
      }),
    bloodType: z.nativeEnum(BloodType).optional(),
    location: z.string({
      required_error: "location is required",
    }).optional(),

    lastDonationDate: z
      .boolean({
        required_error: "lastDonationDate is required",
      })
      .optional(),
  }),
  password: z.string({
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

export const userValidation = {
  createUser,
};
