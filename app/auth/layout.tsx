import Image from "next/image";
import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="sm:px-6 ddh min-h-full py-12 justify-center flex-col flex-1 flex">
        <Link href="/">
          <Image
            className="h-6 w-auto mb-4 mx-auto dark:invert"
            src="/next.svg"
            alt="Sign in page logo"
            width={394}
            height={80}
            priority={true}
          />
        </Link>
        {children}
      </div>
    </div>
  );
};

export default Layout;
