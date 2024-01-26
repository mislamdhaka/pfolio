import Link from "next/link";

import ResetPasswordForm from "./reset-pass-form";

const ResetPassword = async () => {
  return (
    <div className="flex items-center flex-col">
      <h2 className="font-bold text-2xl leading-9 tracking-tight mt-6 text-center">
        Reset password
      </h2>
      <div className="mt-10 sm:max-w-[480px] mx-auto w-full px-4">
        <ResetPasswordForm />
        <p className="mt-10 text-center text-sm text-gray-500">
          Go back to &nbsp;&nbsp;
          <Link
            href="/auth/signin"
            className="font-semibold leading-6 text-sky-500"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
