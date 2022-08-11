import Link from "next/link";
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
  ];
  return (
    <>
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
                priority
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{item.title}</h2>
              <p>{item.desc}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">
                  <Link href={item.href}>Go to Page</Link>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Discover;
