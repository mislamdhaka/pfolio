import Link from "next/link";

import UpdatePasswordForm from "@/app/(front)/auth/update-password/update-pass-form";

const UpdatePassword = async () => {
  return (
    <div className="flex items-center flex-col">
      <h2 className="font-bold text-2xl leading-9 tracking-tight mt-6 text-center">
        Update password
      </h2>
      <div className="mt-10 sm:max-w-[480px] sm:mx-auto sm:w-full">
        <UpdatePasswordForm />
        <p className="mt-10 text-center text-sm text-gray-500">
          Back to &nbsp;&nbsp;
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

export default UpdatePassword;
