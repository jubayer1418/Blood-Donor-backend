import { z } from "zod";

const createUser = z.object({
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
  bloodType: z.string({
    required_error: "bloodType is required",
  }),
  location: z.string({
    required_error: "location is required",
  }),
  age: z.number({
    required_error: "age is required",
  }),
  bio: z.string({
    required_error: "bio is required",
  }),
  lastDonationDate: z.string({
    required_error: "lastDonationDate is required",
  }),
});

export const userValidation = {
  createUser,
};
