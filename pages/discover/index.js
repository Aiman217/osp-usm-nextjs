import Link from "next/link";
import Image from "next/image";

const Discover = () => {
  return (
    <div className="pt-28 pb-10 grid grid-rows-2 sm:grid-cols-2 gap-4 w-[90%] sm:w-[80%]">
      <div className="card bg-base-100 shadow-xl image-full">
        <figure>
          <Image
            src="/doc_bg.png"
            layout="fill"
            objectFit="cover"
            alt="Doc Background"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Documents</h2>
          <p>Find all important documents related with USM.</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">
              <Link href="/discover/documents">Go to Page</Link>
            </button>
          </div>
        </div>
      </div>
      <div className="card bg-base-100 shadow-xl image-full">
        <figure>
          <Image
            src="/ann_bg.png"
            layout="fill"
            objectFit="cover"
            alt="Ann Background"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Announcements</h2>
          <p>Find all important announcements related with USM.</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">
              <Link href="/discover/announcements">Go to Page</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discover;
