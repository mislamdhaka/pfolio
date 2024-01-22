import type { Auth } from "firebase/auth";
import { applyActionCode } from "firebase/auth";

export function handleVerifyEmail(
  auth: Auth,
  actionCode: string | null,
  continueUrl?: string | null,
  lang?: string | null
) {
  // Localize the UI to the selected language as determined by the lang
  // parameter.
  // Try to apply the email verification code.
  if (actionCode) {
    return applyActionCode(auth, actionCode)
      .then((resp) => {
        return resp;
        // Email address has been verified.
        // TODO: Display a confirmation message to the user.
        // You could also provide the user with a link back to the app.
        // TODO: If a continue URL is available, display a button which on
        // click redirects the user back to the app via continueUrl with
        // additional state determined from that URL's parameters.
      })
      .catch((error) => {
        // Code is invalid or expired. Ask the user to verify their email address
        // again.
        return error;
      });
  }
}
