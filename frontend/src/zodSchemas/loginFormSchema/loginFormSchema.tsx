import type { LoginFormData } from "../../components/LoginRegister/Login/Login";
import { ZodType, z } from "zod";

export const loginFormSchema: ZodType<LoginFormData> = z.object({
  username: z
    .string()
    .trim()
    .min(2, { message: "Username must be at least 2 characters long" })
    .regex(/^[A-Za-z0-9]+$/, {
      message: "Username can contain only letters and numbers",
    })
    .max(8, {
      message: "Username must not be longer than 8 characters",
    }),
  password: z
    .string()
    .trim()
    .min(6, {
      message: "Password must contain at least 6 characters",
    })
    .max(20),
});
