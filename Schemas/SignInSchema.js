import { z } from "zod";

export const signInSchema = z.object({
  identifier: z.string().nonempty("This field required"),
  password: z.string().nonempty("Password required"),
});
