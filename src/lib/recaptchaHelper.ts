export function getRecaptchaSecret() {
  const secret = process.env.RECAPTCHA_SECRET;

  if (!secret) {
    throw "Unable to load recaptcha secret from environment variable";
  }

  return secret;
}

export function getRecaptchaVerifyEndpoint() {
  const endpoint = process.env.RECAPTCHA_ENDPOINT;

  if (!endpoint) {
    throw "Unable to load recaptcha endpoint from environment variable";
  }

  return endpoint;
}
