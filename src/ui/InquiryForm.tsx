"use client";

import toast from "react-hot-toast";
import Recaptcha from "./Recaptcha";
import { inquiryFormAction } from "@/lib/inquiryFormAction";
import { InquiryFormSchema } from "@/lib/type/inquiryForm";
import { ReactNode, useState } from "react";
import { ZodFormattedError } from "zod";

type ErrorState = {
  username: string | undefined;
  email: string | undefined;
  inquiry: string | undefined;
};

export default function InquiryForm() {
  const [recaptcha, setRecaptcha] = useState<string | null>();
  const [errorState, setErrorState] = useState<ErrorState>();

  const updateErrorState = (error: ZodFormattedError<ErrorState> | null) => {
    if (!error) {
      setErrorState({
        username: undefined,
        email: undefined,
        inquiry: undefined,
      });
      return;
    }

    setErrorState({
      username: error.username?._errors[0],
      email: error.email?._errors[0],
      inquiry: error.inquiry?._errors[0],
    });
  };

  const onFormSubmit = async (form: FormData) => {
    const username = form.get("username")?.toString() ?? "";
    const email = form.get("email")?.toString() ?? "";
    const inquiry = form.get("inquiry")?.toString() ?? "";

    if (recaptcha === null) {
      toast.error("Please complete reCAPTCHA challenge!");
      return;
    }

    const result = InquiryFormSchema.safeParse({ username, email, inquiry });

    if (!result.success) {
      toast.error("Uh oh. Please check your form again!");
      updateErrorState(result.error.format());
      return;
    }

    updateErrorState(null);

    const response = await inquiryFormAction({ data: result.data, recaptcha });

    if (!response.success) {
      toast.error(
        "Uh oh. The form service seems down. Please report this to us via email. Thanks!"
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
          <InputField
            type="text"
            name="username"
            label="Your name"
            errorMessage={errorState?.username}
          />
          <InputField
            type="email"
            name="email"
            label="Your email"
            errorMessage={errorState?.email}
          />
        </div>
        <TextAreaField
          label="Your inquiry"
          name="inquiry"
          errorMessage={errorState?.inquiry}
        />
        <div className="flex flex-col gap-3">
          <Recaptcha onChange={setRecaptcha} />
          <div>
            <button
              type="submit"
              disabled={recaptcha == null}
              className="bg-[#5C4033] border-[#5C4033] border-2 text-white p-3 hover:cursor-pointer hover:bg-white hover:text-[#5C4033] delay-100 disabled:bg-gray-500 disabled:border-gray-500 disabled:hover:text-white disabled:hover:cursor-not-allowed"
            >
              Send your inquiry
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

type InputFieldBaseProps = {
  label: string;
  name: string;
  errorMessage: string | undefined;
};

type InputFieldWrapperProps = {
  children: ReactNode;
} & InputFieldBaseProps;

type InputFieldProps = {
  type: "text" | "email";
} & InputFieldBaseProps;

function InputFieldWrapper(props: InputFieldWrapperProps) {
  return (
    <div>
      <label htmlFor={props.name} className="block mb-1">
        {props.label}
      </label>
      {props.children}
      {props.errorMessage && (
        <p className="text-red-500 text-xs">{props.errorMessage}</p>
      )}
    </div>
  );
}

function InputField(props: InputFieldProps) {
  return (
    <InputFieldWrapper {...props}>
      <input
        type={props.type}
        name={props.name}
        id={props.name}
        className="border-2 w-lg p-2"
        required
      />
    </InputFieldWrapper>
  );
}

function TextAreaField(props: InputFieldBaseProps) {
  return (
    <InputFieldWrapper {...props}>
      <textarea name="inquiry" className="w-full border-2 p-5"></textarea>
    </InputFieldWrapper>
  );
}
