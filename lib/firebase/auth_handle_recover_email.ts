import {
  checkActionCode,
  applyActionCode,
  sendPasswordResetEmail,
} from "firebase/auth";

export function handleRecoverEmail(auth, actionCode, lang) {
  // Localize the UI to the selected language as determined by the lang
  // parameter.
  let restoredEmail = null;
  // Confirm the action code is valid.
  checkActionCode(auth, actionCode)
    .then((info) => {
      // Get the restored email address.
      restoredEmail = info["data"]["email"];

      // Revert to the old email.
      return applyActionCode(auth, actionCode);
    })
    .then(() => {
      // Account email reverted to restoredEmail

      // TODO: Display a confirmation message to the user.

      // You might also want to give the user the option to reset their password
      // in case the account was compromised:
      sendPasswordResetEmail(auth, restoredEmail)
        .then(() => {
          // Password reset confirmation sent. Ask user to check their email.
        })
        .catch((error) => {
          // Error encountered while sending password reset code.
        });
    })
    .catch((error) => {
      // Invalid code.
    });
}
