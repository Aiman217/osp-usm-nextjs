import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import _ from "lodash";
import { getDoc, doc } from "firebase/firestore";
import { db } from "/firebase-config";
import { AiOutlineCloudDownload } from "react-icons/ai";
import Moment from "moment";
import Loading from "/components/Loading";
import Search from "/components/Search";

const Documents = () => {
  const [docLists, setDocLists] = useState([]);
  const [docSearch, setDocSearch] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch documents
    const getDocuments = async () => {
      const dataDoc = await getDoc(doc(db, "contents", "documents"));
      setDocLists(Object.values(dataDoc.data()));
      setDocSearch(Object.values(dataDoc.data()));
      setLoading(false);
    };
    getDocuments();
    // Finish fetching documents
  }, []);

  return (
    <>
      <Head>
        <title>OSP@USM | Documents</title>
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
                <li>Documents</li>
              </ul>
            </div>
            <Search
              searchList={docSearch}
              setSearchList={setDocSearch}
              backupList={docLists}
              type="name"
            />
          </div>
          <h2 className="bg-base-100 rounded-full px-3 py-1 text-lg text-center my-4 font-bold">
            Important Documents
          </h2>
          <div className="card w-full overflow-x-auto border-2 py-4">
            <table className="table table-zebra table-compact">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Created At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {docSearch.map((item, index) => (
                  <tr key={index} className="hover">
                    <th>{++index}</th>
                    <td>{item.name}</td>
                    <td>
                      {Moment.unix(item.created_at.seconds).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
                    </td>
                    <td>
                      <div className="tooltip" data-tip="Download Document">
                        <button
                          onClick={() => {
                            window.open(item.url);
                          }}
                          className="btn btn-circle"
                        >
                          <AiOutlineCloudDownload size={20} />
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

export default Documents;
