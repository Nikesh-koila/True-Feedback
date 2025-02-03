import { z } from "zod";

export const msgSchema = z.object({
  message: z
    .string()
    .min(1, { message: "Message can't be empty" })
    .max(300, { message: "Content should be within 300 characters" }),
});
