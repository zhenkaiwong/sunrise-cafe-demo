"use client";

import ReCAPTCHA from "react-google-recaptcha";

type Props = {
  onChange: (token: string | null) => void;
};

export default function Recaptcha(props: Props) {
  return (
    <ReCAPTCHA
      sitekey={"6LeGoysrAAAAAC8IjfVNOcFTYzr_MrAf_qqWrGGJ"}
      onChange={props.onChange}
    />
  );
}
