import { z } from "zod";

export const userNameValidation = z
  .string()
  .nonempty("Username is required")
  .min(3, { message: "Username must be atleast 3 characters" })
  .max(20, { message: "Username Must be under 20 characters" })
  .regex(
    /^[a-zA-Z][a-zA-Z0-9-_]*$/,
    "Username should not contain special characters"
  );

export const SignUpSchema = z.object({
  userName: userNameValidation,
  email: z
    .string()
    .nonempty("Email is required")
    .email("Please enter a valid email"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, { message: "Password must be atleast 8 characters" })
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
      "Password not match the pattern"
    ),
});
