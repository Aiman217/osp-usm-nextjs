import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import _ from "lodash";
import Head from "next/head";
import Link from "next/link";
import { db } from "/firebase-config";
import { AiOutlineRead, AiOutlineClose } from "react-icons/ai";
import Moment from "moment";
import Loading from "/components/Loading";
import Search from "/components/Search";

const Documents = () => {
  const [annLists, setAnnLists] = useState([]);
  const [annSearch, setAnnSearch] = useState([]);
  const [annSelect, setAnnSelect] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch announcements
    const getAnn = async () => {
      const dataAnn = await getDoc(doc(db, "contents", "announcements"));
      setAnnLists(Object.values(dataAnn.data()));
      setAnnSearch(Object.values(dataAnn.data()));
      setLoading(false);
    };
    getAnn();
    // Finish fetching announcements
  }, []);

  return (
    <>
      <Head>
        <title>OSP@USM | Announcements</title>
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
                <li>Announcements</li>
              </ul>
            </div>
            <Search
              searchList={annSearch}
              setSearchList={setAnnSearch}
              backupList={annLists}
              type="title"
            />
          </div>
          <h2 className="bg-base-100 rounded-full px-3 py-1 text-lg text-center my-4 font-bold">
            Announcements
          </h2>
          <div className="card w-full overflow-x-auto border-2 py-4">
            <table className="table table-zebra table-compact">
              <thead>
                <tr>
                  <th></th>
                  <th>Title</th>
                  <th>Desc</th>
                  <th>Created At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {annSearch.map((item, index) => (
                  <tr key={index} className="hover">
                    <th>{++index}</th>
                    <td>{item.title}</td>
                    <td>{item.desc.substring(0, 24) + "..."}</td>
                    <td>
                      {Moment.unix(item.created_at.seconds).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
                    </td>
                    <td>
                      <div className="tooltip" data-tip="Read More">
                        <label
                          htmlFor="my-modal-3"
                          className="btn btn-circle modal-button"
                          onClick={() => {
                            setAnnSelect(item);
                          }}
                        >
                          <AiOutlineRead size={20} />
                        </label>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {!_.isEmpty(annSelect) && (
          <div>
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal w-full">
              <div className="modal-box w-[90%] sm:w-[80%]">
                <label
                  htmlFor="my-modal-3"
                  className="btn btn-sm btn-circle absolute right-2 top-2"
                  onClick={() => setAnnSelect([])}
                >
                  <AiOutlineClose size={20} />
                </label>
                <h3 className="text-lg font-bold">{annSelect?.title}</h3>
                <p className="text-sm">
                  {Moment.unix(annSelect?.created_at.seconds).format(
                    "MMMM Do YYYY, h:mm:ss a"
                  )}
                </p>
                <p className="py-4">{annSelect?.desc}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      {loading && <Loading />}
    </>
  );
};

export default Documents;
