import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import Link from "next/link";
import Head from "next/head";
import _ from "lodash";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import ThemeSelector from "./ThemeSelector";

const Nav = ({ children }) => {
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const logout = () => {
    return signOut(auth);
  };

  return (
    <>
      <Head>
        <title>OSP@USM</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="drawer bg-base-200">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content grid grid-flow-row auto-rows-max">
          <div className="navbar w-full bg-base-100 px-4 shadow-sm shadow-neutral">
            <div className="flex-none sm:hidden">
              <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                <HiMenu htmlFor="my-drawer-3" size={25} />
              </label>
            </div>
            <div className="flex-1">
              <h1 className="font-bold">OneStopPortal</h1>
              <div className="divider divider-horizontal hidden sm:block" />
              <ThemeSelector theme="select-sm hidden sm:block" />
              <div className="divider divider-horizontal hidden sm:block" />
            </div>
            <div className="flex-none hidden sm:block">
              <ul className="flex flex-row gap-4">
                <li className="uppercase font-bold">
                  <Link href="/">
                    <a>Home</a>
                  </Link>
                </li>
                <li className="uppercase font-bold">
                  <Link href="/about">
                    <a>About</a>
                  </Link>
                </li>
                <li className="uppercase font-bold">
                  <Link href="/discover">
                    <a>Discover</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex-none">
              <div className="divider divider-horizontal hidden sm:block" />
              {_.isEmpty(user) ? (
                <button className="btn btn-outline btn-success btn-xs sm:btn-md">
                  <Link href="/login">
                    <a>Login</a>
                  </Link>
                </button>
              ) : (
                <button
                  onClick={logout}
                  className="btn btn-outline btn-error btn-xs sm:btn-md"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
          {/* Content of each page appear here */}
          <div className="flex justify-center overflow-x-auto w-full min-h-[calc(100vh-20%)]">{children}</div>
          {/* Content of each page end here */}
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-3"
            className="drawer-overlay sm:hidden"
          ></label>
          <div className="menu p-4 overflow-y-auto w-[60%] bg-base-100 sm:hidden">
            <ThemeSelector theme="select-xs" />
            <div className="divider" />
            <ul className="flex flex-col">
              <li className="uppercase font-bold text-sm">
                <Link href="/">
                  <a>Home</a>
                </Link>
              </li>
              <li className="uppercase font-bold text-sm">
                <Link href="/about">
                  <a>About</a>
                </Link>
              </li>
              <li className="uppercase font-bold text-sm">
                <Link href="/discover">
                  <a>Discover</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
