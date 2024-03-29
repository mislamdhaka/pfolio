import Link from "next/link";

import SigninForm from "./signup-form";

const Signin = async () => {
  return (
    <div className="flex items-center flex-col">
      <h2 className="font-bold text-2xl leading-9 tracking-tight mt-6 text-center">
        Create new account
      </h2>
      <div className="mt-10 sm:max-w-[480px] mx-auto w-full px-4">
        <SigninForm />
        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account? &nbsp;&nbsp;
          <Link href="/auth/signin" className="font-semibold leading-6">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
