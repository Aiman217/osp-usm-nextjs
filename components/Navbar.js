import React, { useState, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import Link from "next/link";
import _ from "lodash";
import { getDoc, doc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../firebase-config";
import ThemeSelector from "./ThemeSelector";

const Nav = ({ children }) => {
  const [user, setUser] = useState({});
  const [showCMS, setShowCMS] = useState(false);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const getAdmins = async (uid) => {
      const dataAdmins = await getDoc(doc(db, "admins", uid));
      if (dataAdmins.exists()) {
        setShowCMS(true);
      }
    };
    onAuthStateChanged(auth, (currentUser) => {
      if (!_.isEmpty(currentUser)) {
        getAdmins(currentUser?.uid);
      } else {
        setShowCMS(false);
      }
    });
  }, [user]);

  return (
    <>
      <div className="drawer bg-base-200">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col min-h-screen">
          <div className="navbar bg-base-100 px-4 shadow-sm shadow-neutral">
            <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                <HiMenu htmlFor="my-drawer-3" size={25} />
              </label>
            </div>
            <div className="flex-1">
              <h1 className="font-bold">OneStopPortal</h1>
              <div className="divider divider-horizontal hidden lg:block" />
              <ThemeSelector theme="select-sm hidden lg:block" />
              <div className="divider divider-horizontal hidden lg:block" />
            </div>
            <div className="flex-none hidden lg:block">
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
                <li className="uppercase font-bold">
                  <Link href="/discussion">
                    <a>Discussion</a>
                  </Link>
                </li>
                {showCMS ? (
                  <li className="uppercase font-bold">
                    <Link href="/cms">
                      <a>CMS</a>
                    </Link>
                  </li>
                ) : (
                  []
                )}
              </ul>
            </div>
            <div className="flex-none">
              <div className="divider divider-horizontal hidden lg:block" />
              {_.isEmpty(user) ? (
                <button className="btn btn-outline btn-success btn-xs lg:btn-md">
                  <Link href="/login">
                    <a>Login</a>
                  </Link>
                </button>
              ) : (
                <button
                  onClick={logout}
                  className="btn btn-outline btn-error btn-xs lg:btn-md"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
          {/* Content of each page appear here */}
          <div className="grow overflow-auto">
            {React.cloneElement(children, { user: user })}
          </div>
          {/* Content of each page end here */}
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-3"
            className="drawer-overlay lg:hidden"
          ></label>
          <div className="menu p-4 overflow-y-auto w-[60%] md:w-[30%] bg-base-100 lg:hidden">
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
              <li className="uppercase font-bold text-sm">
                <Link href="/discussion">
                  <a>Discussion</a>
                </Link>
              </li>
              {showCMS ? (
                <li className="uppercase font-bold text-sm">
                  <Link href="/cms">
                    <a>CMS</a>
                  </Link>
                </li>
              ) : (
                []
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
