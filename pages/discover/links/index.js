import Head from "next/head";
import Link from "next/link";
import { getDoc, doc } from "firebase/firestore";
import { db } from "/firebase-config";
import { AiOutlineLink } from "react-icons/ai";

export async function getServerSideProps(context) {
  const { res } = context;
  res.setHeader("Cache-Control", `s-maxage=60, stale-while-revalidate`);

  const dataLink = await getDoc(doc(db, "contents", "links"));

  return {
    props: {
      linkLists: JSON.stringify(Object.values(dataLink.data())),
    }, // will be passed to the page component as props
  };
}

const Links = ({ linkLists }) => {
  linkLists = JSON.parse(linkLists);

  return (
    <>
      <Head>
        <title>OSP@USM | Links</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="py-4 flex flex-col justify-center items-center gap-4">
        <div className="w-[90%] sm:w-[80%]">
          <div className="text-sm breadcrumbs">
            <ul>
              <li>
                <Link href="/discover">Discover</Link>
              </li>
              <li>Links</li>
            </ul>
          </div>
          <h2 className="bg-base-100 rounded-full px-3 py-1 text-lg text-center mb-4 font-bold">
            Important Links
          </h2>
          <div className="card w-full overflow-x-auto border-2 py-4">
            <table className="table table-zebra table-compact">
              <thead>
                <tr>
                  <th></th>
                  <th>Owner</th>
                  <th>Desc</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {linkLists.map((item, index) => (
                  <tr key={index}>
                    <th>{++index}</th>
                    <td>{item.owner}</td>
                    <td>{item.desc.substring(0, 40) + "..."}</td>
                    <td>
                      <button
                        onClick={() => {
                          window.open(item.url);
                        }}
                        className="btn btn-circle"
                      >
                        <AiOutlineLink size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Links;
