import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

const Discover = () => {
  const topicList = [
    {
      title: "Documents",
      desc: "Find all important documents related with USM.",
      src_img: "/doc_bg.png",
      href: "/discover/documents",
    },
    {
      title: "Announcements",
      desc: "Find all important announcements related with USM.",
      src_img: "/ann_bg.png",
      href: "/discover/announcements",
    },
    {
      title: "Links",
      desc: "Find all important links related with USM.",
      src_img: "/links_bg.png",
      href: "/discover/links",
    },
  ];
  return (
    <>
      <Head>
        <title>OSP@USM | Discovery</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="py-4 flex flex-col justify-center items-center gap-4">
        {topicList.map((item, index) => (
          <div
            key={index}
            className="card bg-base-100 shadow-xl image-full w-[90%] sm:w-[80%]"
          >
            <figure className="relative">
              <Image
                src={item.src_img}
                layout="fill"
                objectFit="cover"
                alt="Doc Background"
                quality={50}
                priority
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{item.title}</h2>
              <p>{item.desc}</p>
              <div className="card-actions justify-end">
                <Link href={item.href}>
                  <button className="btn btn-primary">Go to Page</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Discover;
