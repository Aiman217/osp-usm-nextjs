import { IoIosMenu, IoIosClose } from "react-icons/io";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  return (
    <>
      <div className="w-full h-20 sm:h-20 bg-[#4A2B74] text-white shadow-lg shadow-gray-600 sticky">
        <div className="h-full px-2 sm:px-4 py-1 sm:py-2 grid grid-flow-col gap-2">
          <div
            onClick={() => setNav(true)}
            className="flex items-center justify-start"
          >
            <IoIosMenu size={30} />
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-xl sm:text-2xl font-mono font-bold">Gnosis</h1>
            <p className="hidden sm:block text-lg text-gray-300 font-extralight">
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
                className="m-0 p-0 rounded-full"
              />
            </div>
          </div>
        </div>
        <div
          className={
            "w-[60%] h-screen bg-white text-black top-0 z-10 fixed rounded-tr-lg rounded-br-lg shadow-lg shadow-gray-600 sm:hidden" +
            (!nav ? " hidden" : " ")
          }
        >
          <div className="w-full h-full px-2 py-1 flex flex-col gap-2">
            <div
              onClick={() => setNav(false)}
              className="flex justify-between items-center basis-[10%]"
            >
              <h1 className="flex-grow text-center text-xl font-mono font-bold">
                Gnosis
              </h1>
              <IoIosClose size={30} className="flex-none" />
            </div>
            <ul className="flex flex-col gap-3 basis-[90%]">
              <li className="rounded-lg bg-gray-700 text-white px-2 py-1 text-sm font-bold">
                <Link href="/">Home</Link>
              </li>
              <li className="rounded-lg bg-gray-700 text-white px-2 py-1 text-sm font-bold">
                <Link href="/">Discovery</Link>
              </li>
              <li className="rounded-lg bg-gray-700 text-white px-2 py-1 text-sm font-bold">
                <Link href="/about">About</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
