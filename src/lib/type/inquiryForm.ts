import { z } from "zod";

export const InquiryFormSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 or more characters")
    .max(20, "Username shouldn't exceeds 20 characters"),
  email: z.string().email(),
  inquiry: z
    .string()
    .min(5, "Inquiry should be at least 5 characters")
    .max(200, "Inquiry shoudn't exceeds 200 characters"),
});

export type InquiryForm = z.infer<typeof InquiryFormSchema>;

export type InquiryFormResponse = {
  success: boolean;
  error: string | undefined;
};
