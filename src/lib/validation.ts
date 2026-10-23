import { z } from "zod";
import { en, fill } from "@/content/en";

/*
  Form rules. The length limits are the SAME as the database limits,
  so anything that passes here will also be accepted by Supabase.
  Error messages come from the text dictionary (src/content/en.ts).
*/

export const LIMITS = {
  reviewName: 80,
  reviewComment: 1000,
  messageName: 100,
  messageEmail: 200,
  messageBody: 2000,
  visitPage: 200,
} as const;

const e = en.forms.errors;
const max = (text: string, value: number) => fill(text, { max: String(value) });

export const reviewSchema = z.object({
  name: z.string().trim().min(1, e.nameRequired).max(LIMITS.reviewName, max(e.nameTooLong, LIMITS.reviewName)),
  rating: z.coerce.number(e.ratingRequired).int(e.ratingRequired).min(1, e.ratingRequired).max(5, e.ratingRequired),
  comment: z
    .string()
    .trim()
    .min(1, e.commentRequired)
    .max(LIMITS.reviewComment, max(e.commentTooLong, LIMITS.reviewComment)),
});

export const messageSchema = z.object({
  name: z.string().trim().min(1, e.nameRequired).max(LIMITS.messageName, max(e.nameTooLong, LIMITS.messageName)),
  email: z
    .string()
    .trim()
    .min(1, e.emailRequired)
    .max(LIMITS.messageEmail, max(e.emailTooLong, LIMITS.messageEmail))
    .pipe(z.email(e.emailInvalid)),
  message: z
    .string()
    .trim()
    .min(1, e.messageRequired)
    .max(LIMITS.messageBody, max(e.messageTooLong, LIMITS.messageBody)),
});

export const visitSchema = z.object({
  page: z.string().min(1).max(LIMITS.visitPage),
});

export type ReviewInput = z.infer<typeof reviewSchema>;
export type MessageInput = z.infer<typeof messageSchema>;

/** Turns a failed zod check into { fieldName: "first error message" }. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const result: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!result[key]) result[key] = issue.message;
  }
  return result;
}
