import Image from "next/image";
import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gray-50 flex min-h-[900px] flex-col">
      <div className="sm:px-6 ddh min-h-full py-12 justify-center flex-col flex-1 flex">
        <Link href="/">
          <Image
            className="h-6 w-auto mb-4 mx-auto"
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
