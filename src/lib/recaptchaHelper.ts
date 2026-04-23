export function getRecaptchaSecret() {
  const secret = process.env.NEXT_PUBLIC_RECAPTCHA_SECRET;

  return secret;
}

export function getRecaptchaVerifyEndpoint() {
  const endpoint = process.env.NEXT_PUBLIC_RECAPTCHA_ENDPOINT;

  return endpoint;
}

export function validateRecaptchaSecret(): boolean {
  const secret = getRecaptchaSecret();

  return secret !== undefined;
}

export function validateRecaptchaVerifyEndpoint(): boolean {
  const endpoint = getRecaptchaVerifyEndpoint();

  return endpoint !== undefined;
}

export async function verifyRecaptchaAsync(
  clientKey: string
): Promise<boolean> {
  const recaptchaSecretValid = validateRecaptchaSecret();
  const recaptchaVerifyEndpointValid = validateRecaptchaVerifyEndpoint();

  if (!recaptchaSecretValid) {
    throw "Unable to load recaptcha endpoint from environment variable";
  }

  if (!recaptchaVerifyEndpointValid) {
    throw "Unable to load recaptcha endpoint from environment variable";
  }

  const secret = getRecaptchaSecret();
  const endpoint = getRecaptchaVerifyEndpoint();

  const verifyUrl = `${endpoint}?secret=${secret}&response=${clientKey}`;

  const response = await fetch(
    verifyUrl,
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
