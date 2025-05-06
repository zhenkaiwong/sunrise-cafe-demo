"use server";

import { unknown, z } from "zod";
import { getRecaptchaSecret } from "./recaptchaHelper";
import { InquiryFormResponse, InquiryFormSchema } from "./type/inquiryForm";

const ClientInquiryFormSchema = z.object({
  data: InquiryFormSchema,
  recaptcha: z.string(),
});

export async function inquiryFormAction(
  form: unknown
): Promise<InquiryFormResponse> {
  const secret = getRecaptchaSecret();
  const result = ClientInquiryFormSchema.safeParse(form);

  if (!result.success) {
    console.error(`${new Date().getUTCDate()}: Failed to parse inquiry form`);
    console.error(form);
    return { success: false, error: "Failed to pass form validation" };
  }

  console.log({ result, secret });

  return { success: false, error: "123" };
}
