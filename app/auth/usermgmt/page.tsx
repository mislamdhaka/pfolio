"use client";
import { useSearchParams } from "next/navigation";
import UpdatePassword from "./update-password";
import VerifyEmail from "./verify-emal";
import RecoverEmail from "./recover-email";

const UserManagement = () => {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const actionCode = searchParams.get("oobCode");
  const continueUrl = searchParams.get("continueUrl");
  const lang = searchParams.get("lang") || "en";

  switch (mode) {
    case "resetPassword":
      return (
        <UpdatePassword
          actionCode={actionCode}
          continueUrl={continueUrl}
          lang={lang}
        />
      );
    case "recoverEmail":
      return <RecoverEmail actionCode={actionCode} lang={lang} />;
    case "verifyEmail":
      return (
        <VerifyEmail
          actionCode={actionCode}
          continueUrl={continueUrl}
          lang={lang}
        />
      );
    default:
      return <div>this is default return</div>;
  }
};

export default UserManagement;
