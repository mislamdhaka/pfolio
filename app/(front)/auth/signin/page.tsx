import Link from "next/link";

import SigninForm from "@/app/(front)/auth/signin/signin-form";

const Signin = async () => {
  return (
    <div className="min-h-screen flex items-center flex-col">
      <h2 className="font-bold text-2xl leading-9 tracking-tight mt-6 text-center">
        Sign in to your account
      </h2>
      <div className="mt-10 sm:max-w-[480px] sm:mx-auto sm:w-full">
        <SigninForm />
        <p className="mt-10 text-center text-sm text-gray-500">
          Don&apos;t have an account?&nbsp;&nbsp;
          <Link
            href="/auth/signup"
            className="font-semibold leading-6 text-sky-500"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
