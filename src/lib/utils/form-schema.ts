import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const registerSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    username: z.string().min(3),
    repeatPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords do not match",
    path: ["repeatPassword"],
  });

export const onboardingSchema = z.object({
  name: z.string().min(3),
  bio: z.string().min(3).optional(),
});


export const sendMessageSchema = z
  .object({
    message: z.string().optional(),
    attachments: z
      .array(
        z.instanceof(File).refine(
          (file) => {
            const validTypes = [
              "image/jpeg",
              "image/png",
              "image/gif",
              "video/mp4",
            ];
            return validTypes.includes(file.type);
          },
          {
            message:
              "Only images (JPEG, PNG, GIF) and videos (MP4) are allowed",
          }
        )
      )
      .max(4, "Maximum 4 files allowed")
      .refine(
        (files) => {
          const hasVideo = files.some((file) => file.type.startsWith("video/"));
          return !hasVideo || files.length === 1;
        },
        { message: "Can only upload one video at a time" }
      )
      .refine(
        (files) => {
          const exceedSize = files.some((file) => file.size >= 20 * 1024 * 1024);
          if (!exceedSize) return true;
        },
        {
          message: "Each file must be 20MB or less",
        }
      )
      .optional(),
  })
  .refine(
    (data) => data.message || (data.attachments && data.attachments.length > 0),
    {
      message: "Either a message or at least one attachment is required",
      path: ["message"],
    }
  );
