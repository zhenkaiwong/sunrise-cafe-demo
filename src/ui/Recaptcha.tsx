"use client";

import { getRecaptchaSecret } from "@/lib/recaptchaHelper";
import ReCAPTCHA from "react-google-recaptcha";

type Props = {
  onChange: (token: string | null) => void;
  enable: boolean
};

const siteKey = getRecaptchaSecret();

export default function Recaptcha(props: Props) {


  if (!props.enable) {
    return <div>
      <p className="text-xl">Recaptcha validation is disabled at the moment</p>
    </div>
  }
  return (
    <ReCAPTCHA
      sitekey={siteKey!}
      onChange={props.onChange}
    />
  );
}
