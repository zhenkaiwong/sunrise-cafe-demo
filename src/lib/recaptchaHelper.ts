function getRecaptchaSecret() {
  const secret = process.env.RECAPTCHA_SECRET;

  if (!secret) {
    throw "Unable to load recaptcha secret from environment variable";
  }

  return secret;
}

function getRecaptchaVerifyEndpoint() {
  const endpoint = process.env.RECAPTCHA_ENDPOINT;

  if (!endpoint) {
    throw "Unable to load recaptcha endpoint from environment variable";
  }

  return endpoint;
}

export async function verifyRecaptchaAsync(
  clientKey: string
): Promise<boolean> {
  const secret = getRecaptchaSecret();
  const endpoint = getRecaptchaVerifyEndpoint();

  const response = await fetch(
    `${endpoint}?secret=${secret}&response=${clientKey}`,
    { method: "POST" }
  );

  if (!response.ok) {
    return false;
  }

  const verifyResult = await response.json();

  if (!verifyResult.success) {
    console.error(
      "Failed to verify recaptcha: " + verifyResult["error-codes"][0]
    );
    return false;
  }

  return true;
}
