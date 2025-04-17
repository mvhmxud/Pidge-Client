import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});


export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  username: z.string().min(3),
  repeatPassword: z.string().min(8),
}).refine((data) => data.password === data.repeatPassword, {
  message: "Passwords do not match",
  path: ["repeatPassword"],
});

export const onboardingSchema = z.object({
  name: z.string().min(3),
  bio: z.string().min(3).optional(),
});
