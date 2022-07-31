import { IoIosMenu, IoIosClose } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const menuList = [
    {
      href: "/",
      title: "home",
    },
    {
      href: "/discovery",
      title: "discovery",
    },
    {
      href: "/about",
      title: "about",
    },
  ];

  return (
    <>
      <div className="w-full h-20 sm:h-20 bg-[#4A2B74] text-white shadow-lg shadow-gray-600 fixed select-none">
        <div className="h-full px-2 sm:px-4 py-1 sm:py-2 grid grid-flow-col auto-cols-fr gap-2">
          <div className="flex items-center justify-start">
            <IoIosMenu
              onClick={() => setNav(true)}
              size={30}
              className="cursor-pointer sm:hidden"
            />
            <ul className="hidden sm:flex flex-row gap-4">
              {menuList.map((item, index) => (
                <li key={index} className="text-sm font-bold uppercase">
                  <Link href={item.href}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-xl sm:text-2xl font-mono font-bold">Gnosis</h1>
            <p className="hidden sm:block text-sm text-gray-300 font-extralight text-center">
              Where journey of knowledge begin
            </p>
          </div>
          <div className="flex items-center justify-end">
            <div className="rounded-full border-white flex items-center shadow-sm shadow-white">
              <Image
                src="https://api.lorem.space/image/face?w=120&h=120"
                alt="Logo"
                width={40}
                height={40}
                className="m-0 p-0 rounded-full cursor-pointer"
              />
            </div>
          </div>
        </div>
        <div
          className={
            "w-full h-screen z-20 top-0 fixed grid grid-flow-col" +
            (!nav ? " hidden" : " ")
          }
        >
          <div
            onClick={() => setNav(false)}
            className="bg-gray-600 opacity-60"
          />
          <div
            className={
              "w-[60%] h-screen bg-white text-black z-10 fixed rounded-tr-lg rounded-br-lg shadow-lg shadow-gray-600" +
              (!nav ? " hidden" : " ")
            }
          >
            <div className="w-full h-full px-2 py-1 flex flex-col gap-2">
              <div className="flex justify-between items-center basis-[10%]">
                <h1 className="flex-grow text-center text-xl font-mono font-bold">
                  Gnosis
                </h1>
                <IoIosClose
                  onClick={() => setNav(false)}
                  size={30}
                  className="flex-none cursor-pointer"
                />
              </div>
              <ul className="flex flex-col gap-3 basis-[90%] px-4 py-2">
                {menuList.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => setNav(false)}
                    className="rounded-lg bg-gray-700 text-white px-2 py-1 text-sm text-center uppercase font-bold"
                  >
                    <Link href={item.href}>{item.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
