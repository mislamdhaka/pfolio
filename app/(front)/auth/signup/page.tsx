import Link from "next/link";

import SigninForm from "@/app/(front)/auth/signup/signup-form";

const Signin = async () => {
  return (
    <div className="min-h-screen flex items-center flex-col">
      <h2 className="font-bold text-2xl leading-9 tracking-tight mt-6 text-center">
        Create new account
      </h2>
      <div className="mt-10 sm:max-w-[480px] sm:mx-auto sm:w-full">
        <SigninForm />
        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account? &nbsp;&nbsp;
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

export default Signin;
