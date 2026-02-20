import { z } from "zod";

export const registerSchema = z.object({
  email: z.email({ error: "Invalid email address" }),
  password: z.string().min(6),
  name: z.string().min(3),
});
