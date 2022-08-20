import Link from "next/link";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>OSP@USM | Home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex justify-center items-center h-full">
        <div className="hero w-[90%] sm:w-[80%]">
          <div className="hero-content text-center">
            <div className="max-w-xl sm:bg-base-200 sm:bg-opacity-70 sm:rounded-lg sm:p-4">
              <h1 className="text-2xl sm:text-4xl font-bold">
                OneStopPortal@USM
              </h1>
              <p className="text-lg sm:text-2xl py-6">
                A website specially made for USM. Providing a lot of useful
                tools to help you manage your life as a usmian.
              </p>
              <Link href="/register">
                <button className="btn btn-sm sm:btn-lg btn-primary">
                  Register Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
