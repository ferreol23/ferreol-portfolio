import { z } from "zod";

/*
  Form rules. The length limits are the SAME as the database limits,
  so anything that passes here will also be accepted by Supabase.
*/

export const reviewSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(80, "Name must be 80 characters or fewer."),
  rating: z.coerce
    .number()
    .int()
    .min(1, "Please choose a rating from 1 to 5.")
    .max(5, "Please choose a rating from 1 to 5."),
  comment: z
    .string()
    .trim()
    .min(1, "Please write a short comment.")
    .max(1000, "Comment must be 1000 characters or fewer."),
});

export const messageSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(100, "Name must be 100 characters or fewer."),
  email: z
    .string()
    .trim()
    .min(3, "Please enter your email address.")
    .max(200, "Email must be 200 characters or fewer.")
    .pipe(z.email("Please enter a valid email address.")),
  message: z
    .string()
    .trim()
    .min(1, "Please write a message.")
    .max(2000, "Message must be 2000 characters or fewer."),
});

export const visitSchema = z.object({
  page: z.string().min(1).max(200),
});

export type ReviewInput = z.infer<typeof reviewSchema>;
export type MessageInput = z.infer<typeof messageSchema>;
