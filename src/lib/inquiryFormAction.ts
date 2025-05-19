"use server";

import { z } from "zod";
import { InquiryFormResponse, InquiryFormSchema } from "./type/inquiryForm";
import { verifyRecaptchaAsync } from "./recaptchaHelper";

const ClientInquiryFormSchema = z.object({
  data: InquiryFormSchema,
  recaptcha: z.string().min(1),
});

export async function inquiryFormAction(
  form: unknown
): Promise<InquiryFormResponse> {
  const result = ClientInquiryFormSchema.safeParse(form);

  if (!result.success) {
    const formattedError = result.error.format();
    const errorMessage =
      formattedError.recaptcha?._errors[0] ?? "Failed to parse inquiry form";
    console.error(errorMessage);
    console.error(form);
    return { success: false, error: errorMessage };
  }

  const recaptchaVerified = await verifyRecaptchaAsync(result.data.recaptcha);

  if (!recaptchaVerified) {
    const error = "Unable to verify recaptcha. Stop processing form.";
    console.error(error);
    return { success: false, error };
  }

  console.log("Inquiry received.", { inquiry: result.data.data });

  return { success: true, error: undefined };
}
