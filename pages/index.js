import Head from "next/head";
import Image from "next/image";

export default function Home() {
  const bookList = [
    {
      src: "https://picsum.photos/1200/600",
    },
    {
      src: "https://picsum.photos/1200/600",
    },
    {
      src: "https://picsum.photos/1200/600",
    },
    {
      src: "https://picsum.photos/1200/600",
    },
    {
      src: "https://picsum.photos/1200/600",
    },
    {
      src: "https://picsum.photos/1200/600",
    },
    {
      src: "https://picsum.photos/1200/600",
    },
    {
      src: "https://picsum.photos/1200/600",
    },
  ];
  const announcementList = [
    {
      title: "Title 1",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio cum inventore porro non a praesentium?",
    },
    {
      title: "Title 2",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio cum inventore porro non a praesentium?",
    },
    {
      title: "Title 3",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio cum inventore porro non a praesentium?",
    },
    {
      title: "Title 4",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio cum inventore porro non a praesentium?",
    },
    {
      title: "Title 5",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio cum inventore porro non a praesentium?",
    },
  ];

  return (
    <div>
      <Head>
        <title>OSP@USM | Home</title>
      </Head>
      <div className="w-full sm:max-w-[1024px] h-full px-4 pb-6 pt-32 grid gap-4 auto-cols-fr mx-auto select-none">
        <ul className="scrollbar snap-x snap-mandatory flex flex-nowrap gap-2 overflow-x-scroll items-center bg-gray-300 bg-opacity-40 rounded-lg">
          {bookList.map((item, index) => (
            <li
              key={index}
              className="flex-none snap-center first:pl-2 last:pr-2"
            >
              <img
                src={item.src}
                alt="Logo"
                className="m-0 p-0 w-[240px] sm:w-[600px] object-contain h-auto rounded-lg sm:rounded-2xl"
              />
            </li>
          ))}
        </ul>
        <div className="grid sm:grid-cols-2">
          <div className="p-1 flex flex-col gap-2 sm:gap-4">
            <h1 className="text-lg font-bold text-center uppercase mb-4">Announcement</h1>
            {announcementList.map((item, index) => (
              <div
                key={index}
                className="rounded-lg bg-[#4A2B74] text-white px-2 py-1 shadow-sm shadow-black"
              >
                <h1 className="text-lg font-bold">{item.title}</h1>
                <p className="text-xs font-light">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="hidden sm:block">
            <h1>Grid 3</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
