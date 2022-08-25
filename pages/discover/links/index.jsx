import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { getDoc, doc } from "firebase/firestore";
import { db } from "/firebase-config";
import { AiOutlineLink } from "react-icons/ai";
import Loading from "/components/Loading";
import Search from "/components/Search";

const Links = () => {
  const [linkLists, setLinkLists] = useState([]);
  const [linkSearch, setLinkSearch] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch links
    const getLinks = async () => {
      const dataLink = await getDoc(doc(db, "contents", "links"));
      setLinkLists(Object.values(dataLink.data()));
      setLinkSearch(Object.values(dataLink.data()));
      setLoading(false);
    };
    getLinks();
    // Finish fetching links
  }, []);

  return (
    <>
      <Head>
        <title>OSP@USM | Links</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="py-4 flex flex-col justify-center items-center gap-4">
        <div className="w-[90%] sm:w-[80%]">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm breadcrumbs">
              <ul>
                <li>
                  <Link href="/discover">Discover</Link>
                </li>
                <li>Links</li>
              </ul>
            </div>
            <Search
              searchList={linkSearch}
              setSearchList={setLinkSearch}
              backupList={linkLists}
              type="owner"
            />
          </div>
          <h2 className="bg-base-100 rounded-full px-3 py-1 text-lg text-center my-4 font-bold">
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
                {linkSearch.map((item, index) => (
                  <tr key={index}>
                    <th>{++index}</th>
                    <td>{item.owner}</td>
                    <td>{item.desc.substring(0, 40) + "..."}</td>
                    <td>
                      <div className="tooltip" data-tip="Go To Link">
                        <button
                          onClick={() => {
                            window.open(item.url);
                          }}
                          className="btn btn-circle"
                        >
                          <AiOutlineLink size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {loading && <Loading />}
    </>
  );
};

export default Links;
