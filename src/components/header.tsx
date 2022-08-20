import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const menuItems = [
    {
      href: "/dashboard",
      title: "Dashboard",
    },
    {
      href: "/projects",
      title: "Projects",
    },
  ];

  if (session === null) {
    signIn(undefined, {
      callbackUrl: "/dashboard",
    });
  }

  return (
    <>
      <nav className="sticky flex flex-col justify-center px-2 h-auto bg-violet-100">
        <div className="flex flex-row justify-between">
          <h1 className="text-3xl leading-normal font-extrabold text-gray-700 whitespace-nowrap">
            <span className="text-purple-300">T3</span> Tracker
          </h1>
          <ul className="hidden md:flex items-center flex-row text-xl font-semibold">
            {menuItems.map(({ href, title }) => (
              <li key={title} className="mx-2">
                <Link href={href}>
                  <a>{title}</a>
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between">
            <button
              className="md:hidden mx-2 flex items-center"
              onClick={() => setIsNavbarOpen(!isNavbarOpen)}
            >
              <Image src="/bars-solid.svg" alt="Menu" height={22} width={22} />
            </button>
            <button
              className="mx-2 flex items-center"
              onClick={() => signOut()}
            >
              <Image
                className="rounded-full"
                src={
                  session?.user?.image
                    ? session.user.image
                    : "/circle-user-solid.svg"
                }
                alt="User"
                height={22}
                width={22}
              />
            </button>
            <button className="mx-2 flex items-center">
              <Image
                src="/bell-solid.svg"
                alt="Notifications"
                height={22}
                width={22}
              />
            </button>
            <button className="mx-2 flex items-center">
              <Image
                src="/gear-solid.svg"
                alt="Settings"
                height={22}
                width={22}
              />
            </button>
          </div>
        </div>
        <div>
          <ul
            className={`${
              isNavbarOpen ? "hidden" : ""
            } md:hidden flex items-center flex-col text-xl font-semibold`}
          >
            {menuItems.map(({ href, title }) => (
              <li key={title} className="mx-2">
                <Link href={href}>
                  <a>{title}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
