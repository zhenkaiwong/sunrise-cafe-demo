"use client";

import ReCAPTCHA from "react-google-recaptcha";

type Props = {
  onChange: (token: string | null) => void;
  enable: boolean
};

export default function Recaptcha(props: Props) {

  if (!props.enable) {
    return <div>
      <p className="text-xl">Recaptcha validation is disabled at the moment</p>
    </div>
  }
  return (
    <ReCAPTCHA
      sitekey={"6Ldxa8UsAAAAAOZd9QjhGiAJEl6dwMIoL4NlciCa"}
      onChange={props.onChange}
    />
  );
}
