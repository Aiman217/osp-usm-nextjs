import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "/firebase-config";
import Moment from "moment";
import Loading from "/components/Loading";
import { AiOutlinePlusSquare, AiOutlineClose } from "react-icons/ai";
import CreateDiscussion from "./CreateDiscussion";
import _ from "lodash";

const Discussion = ({ user }) => {
  const [discussList, setDiscussList] = useState([]);
  const [createDiscussion, setCreateDiscussion] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Fetch announcements
    const getDiscuss = async () => {
      const dataDiscuss = await getDocs(collection(db, "discussion"));
      setDiscussList(
        dataDiscuss.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
      setLoading(false);
    };
    getDiscuss();
    // Finish fetching announcements
  }, [user]);

  return (
    <>
      <Head>
        <title>OSP@USM | Discussion</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="py-4 flex flex-col justify-center items-center gap-4">
        <div className="w-[90%] sm:w-[80%]">
          <div className="bg-base-100 rounded-full flex flex-rows justify-between items-center px-6 py-2 text-lg text-center mb-4 font-bold">
            <h1>Discussion</h1>
            {user && (
              <label
                htmlFor="my-modal-create"
                className="btn btn-sm btn-ghost modal-button cursor-pointer"
                onClick={() => {
                  setCreateDiscussion(true);
                }}
              >
                <AiOutlinePlusSquare size={25} />
              </label>
            )}
          </div>
          <div className="flex flex-col gap-4 w-full">
            {discussList.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  router.push({
                    pathname: `/discussion/${item.id}`,
                    query: { data: JSON.stringify(item) },
                  });
                }}
                className="indicator w-full cursor-pointer hover:scale-105 duration-300"
              >
                <span
                  className={
                    "indicator-item badge font-bold " + item.label.color
                  }
                ></span>
                <div className="card card-compact w-full bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title">
                      {item.title}
                      <a className="text-sm font-light">
                        (
                        {Moment.unix(item.created_at.seconds).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
                        )
                      </a>
                    </h2>
                    <p>{item.desc.substring(0, 240) + "..."}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {createDiscussion && (
          <div>
            <input
              type="checkbox"
              id="my-modal-create"
              className="modal-toggle"
            />
            <div className="modal w-full">
              <div className="modal-box w-[90%] sm:w-[80%]">
                <label
                  htmlFor="my-modal-create"
                  className="btn btn-sm btn-circle absolute right-2 top-2"
                  onClick={() => setCreateDiscussion(false)}
                >
                  <AiOutlineClose size={20} />
                </label>
                <CreateDiscussion />
              </div>
            </div>
          </div>
        )}
      </div>
      {loading && <Loading />}
    </>
  );
};

export default Discussion;
