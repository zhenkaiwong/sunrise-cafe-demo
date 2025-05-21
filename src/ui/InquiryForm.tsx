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
        "Uh oh. The form service seems down. Please report this to us via email. Thanks!",
      );
      console.error(
        `${new Date().getUTCDate()}: Form submission to server failed.`,
      );

      return;
    }

    toast.custom(
      <div className="flex items-center gap-5 bg-[#FFF8F0] p-5 text-lg">
        <div>
          <p className="text-2xl">😊</p>
        </div>
        <div>
          <p>Thank you for your inquiry</p>
          <p>We will reach out to you by email soon</p>
        </div>
      </div>,
    );
  };
  return (
    <div className="flex flex-col items-center gap-10">
      <h1 className="text-5xl font-bold lg:text-6xl">Contact Us</h1>
      <form className="flex w-full flex-col gap-5 p-5" action={onFormSubmit}>
        <div className="flex flex-col gap-5 md:flex-row xl:gap-20">
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
              className="w-full border-2 border-[#5C4033] bg-[#5C4033] p-3 text-white delay-100 hover:cursor-pointer hover:bg-white hover:text-[#5C4033] disabled:border-gray-500 disabled:bg-gray-500 disabled:hover:cursor-not-allowed disabled:hover:text-white lg:w-auto"
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
    <div className="flex-1">
      <label htmlFor={props.name} className="mb-1 block">
        {props.label}
      </label>
      {props.children}
      {props.errorMessage && (
        <p className="text-xs text-red-500">{props.errorMessage}</p>
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
        className="w-full border-2 p-2"
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
