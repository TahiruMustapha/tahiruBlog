import Image from "next/image";
import Link from "next/link";
import logoDark from "../public/images/logoDark.png";
import stranger from "../public/images/user.jpg";
import { signIn, signOut, useSession } from "next-auth/react";
const Header = () => {
  const { data: session } = useSession();
  return (
    <div className=" h-20 border-b-[1px] border-b-black font-titleFont sticky top-0 bg-white z-50 px-4">
      <div className="max-w-7xl h-full mx-auto flex justify-between items-center">
        <Link href="/">
          <div>
            <Image width={80} height={80} src={logoDark} alt="logoDark" />
          </div>
        </Link>
        <div>
          <ul className="hidden lg:inline-flex gap-8 uppercase text-sm font-semibold">
            <li className="text-primaryColor hover:text-secondaryColor cursor-pointer duration-300">
              Home
            </li>
            <li className="text-primaryColor hover:text-secondaryColor cursor-pointer duration-300">
              Posts
            </li>
            <li className="text-primaryColor hover:text-secondaryColor cursor-pointer duration-300">
              Pages
            </li>
            <li className="text-primaryColor hover:text-secondaryColor cursor-pointer duration-300">
              Features
            </li>
            <li className="text-primaryColor hover:text-secondaryColor cursor-pointer duration-300">
              Contact
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-8 text-lg">
          <div className="flex items-center gap-1">
            <Image
              className=" rounded-full"
              src={session ? session?.user?.image! : stranger}
               alt="logo"
               width={35}
               height={35}
            />
            <p className="text-sm font-medium">
              {session ? session?.user?.name : "Hello Stranger"}
            </p>
          </div>
          {session ? (
            <button
              onClick={() => signOut()}
              className="uppercase text-sm border-[1px] border-primaryColor hover:border-secondaryColor px-4 py-1 font-semibold hover:text-white rounded-md hover:bg-secondaryColor transition-all duration-300 active:bg-yellow-600"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => signIn()}
              className="uppercase text-sm border-[1px] border-primaryColor hover:border-secondaryColor px-4 py-1 font-semibold hover:text-white rounded-md hover:bg-secondaryColor transition-all duration-300 active:bg-yellow-600"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
