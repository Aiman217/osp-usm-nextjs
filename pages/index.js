import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex items-center w-[90%] sm:w-[80%]">
        <div className="hero">
          <div className="hero-content text-center">
            <div className="max-w-xl sm:bg-base-200 sm:bg-opacity-70 sm:rounded-lg sm:p-4">
              <h1 className="text-2xl sm:text-4xl font-bold">
                OneStopPortal@USM
              </h1>
              <p className="text-lg sm:text-2xl py-6">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Voluptatem asperiores accusantium odit veniam delectus aliquid
                perferendis eaque, magni aliquam sequi!
              </p>
              <button className="btn btn-sm sm:btn-lg btn-primary">
                <Link href="/register">Register Now</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
