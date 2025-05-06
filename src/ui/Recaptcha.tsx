"use client";

import Script from "next/script";

export default function Recaptcha() {
  return (
    <>
      <Script src="https://www.google.com/recaptcha/api.js" async defer />
      <div
        className="g-recaptcha"
        data-sitekey="6LeGoysrAAAAAC8IjfVNOcFTYzr_MrAf_qqWrGGJ"
      ></div>
    </>
  );
}
