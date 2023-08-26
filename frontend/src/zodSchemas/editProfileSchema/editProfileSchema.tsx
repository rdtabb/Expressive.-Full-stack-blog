import { z, ZodType } from "zod";
import { EditProfileForm } from "../../components/Profile/EditProfilePopup/EditProfilePopup";

export const editProfileSchema: ZodType<EditProfileForm> = z.object({
  username: z
    .string()
    .trim()
    .min(2, { message: "Username must contain at least 2 characters" })
    .regex(/^[A-Za-z0-9\s]+$/, {
      message: "Username can contain only letters and numbers",
    })
    .max(20, { message: "Username must not be longer than 20 characters" }),
  status: z
    .string()
    .trim()
    .min(2, { message: "Status must contain at least 2 characters" })
    .regex(/^[A-Za-z0-9\s]+$/, {
      message: "Username can contain only letters and numbers",
    }),
});
