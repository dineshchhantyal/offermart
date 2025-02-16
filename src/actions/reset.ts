"use server";

import * as z from "zod";

import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid email!" };
  }

  const { email } = validatedFields.data;

  const exitingUser = await getUserByEmail(email);

  if (!exitingUser) {
    return {
      error: "User not found!",
    };
  }

  return { success: "Reset email sent!" };
};
