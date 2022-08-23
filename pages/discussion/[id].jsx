import { useRouter } from "next/router";
import Head from "next/head";
import Link from 'next/link'
import _ from "lodash";
import { useState, useEffect } from "react";
import Moment from "moment";

const DiscussionDetail = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (router.query.data) {
      setData(JSON.parse(router.query.data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>OSP@USM | Discussion</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="py-4 flex flex-col justify-center items-center gap-4">
        <div className="w-[90%] sm:w-[80%]">
          <div className="text-sm breadcrumbs">
            <ul>
              <li>
                <Link href="/discussion">Discussion</Link>
              </li>
              <li>{data.title}</li>
            </ul>
          </div>
          <h2 className="bg-base-100 rounded-full px-3 py-1 text-lg text-center mb-4 font-bold">
            {data.title}
          </h2>
          <div className="card card-compact bg-base-100 shadow-xl">
            <div className="card-body gap-4">
              <p>{data.desc}</p>
              <div className="divider m-0 p-0"></div>
              <div className="card-actions justify-end">
                <button
                  onClick={() => setHide(!hide)}
                  className="btn btn-sm btn-primary"
                >
                  {hide ? "Show Comments" : "Hide Comments"}
                </button>
              </div>
              {data.comments &&
                data.comments.map((item, index) => (
                  <div
                    key={index}
                    className={
                      "w-full bg-base-200 py-2 px-4 rounded-lg " +
                      (hide ? "hidden" : "")
                    }
                  >
                    <div className="flex flex-row justify-between">
                      <h1 className="text-md font-bold mb-2">{item.email}</h1>
                      <div className="text-sm">
                        {Moment.unix(item.created_at.seconds).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
                      </div>
                    </div>
                    <p>{item.comment}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DiscussionDetail;
