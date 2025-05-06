"use client";

import toast from "react-hot-toast";
import Recaptcha from "./Recaptcha";
import { inquiryFormAction } from "@/lib/inquiryFormAction";
import { InquiryFormSchema } from "@/lib/type/inquiryForm";

export default function InquiryForm() {
  const onFormSubmit = async (form: FormData) => {
    const username = form.get("username")?.toString() ?? "";
    const email = form.get("username")?.toString() ?? "";
    const inquiry = form.get("inquiry")?.toString() ?? "";
    const recaptcha = form.get("g-recaptcha-response")?.toString() ?? "";

    const result = InquiryFormSchema.safeParse({ username, email, inquiry });

    if (!result.success) {
      toast.error("Uh oh. Please check your form again!");
      console.log({ rr: result.error.format() });
      return;
    }

    const response = await inquiryFormAction({ form: result.data, recaptcha });

    if (!response.success) {
      toast.error(
        "Uh on. The form service seems down. Please report this to us via email. Thanks!"
      );
      console.error(
        `${new Date().getUTCDate()}: Form submission to server failed.`
      );

      return;
    }

    toast.custom(
      <div className="p-5 text-lg bg-[#FFF8F0] flex gap-5 items-center">
        <div>
          <p className="text-2xl">😊</p>
        </div>
        <div>
          <p>Thank you for your inquiry</p>
          <p>We will reach out to you by email soon</p>
        </div>
      </div>
    );
  };
  return (
    <div className="flex flex-col items-center gap-10">
      <h1 className="text-6xl">Contact Us</h1>
      <form className="flex flex-col gap-5" action={onFormSubmit}>
        <div className="flex gap-20">
          <InputField type="text" name="username" label="Your name" />
          <InputField type="email" name="email" label="Your email" />
        </div>
        <div>
          <label htmlFor="inquiry" className="mb-1">
            Your inquiry
          </label>
          <textarea name="inquiry" className="w-full border-2 p-5"></textarea>
        </div>
        <div className="flex flex-col gap-3">
          <Recaptcha />
          <div>
            <button
              type="submit"
              className="bg-[#5C4033] border-[#5C4033] border-2 text-white p-3 hover:cursor-pointer hover:bg-white hover:text-[#5C4033] delay-100"
            >
              Send your inquiry
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

type InputFieldProps = {
  label: string;
  name: string;
  type: "text" | "email";
};

function InputField(props: InputFieldProps) {
  return (
    <div>
      <label htmlFor={props.name} className="block mb-1">
        {props.label}
      </label>
      <input
        type={props.type}
        name={props.name}
        id={props.name}
        className="border-2 w-lg p-2"
        required
      />
    </div>
  );
}
