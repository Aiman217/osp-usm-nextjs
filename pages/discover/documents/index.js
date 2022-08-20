import { useEffect, useState } from "react";
import Head from "next/head";
import Link from 'next/link'
import { getDoc, doc } from "firebase/firestore";
import { db } from "/firebase-config";
import { AiOutlineCloudDownload } from "react-icons/ai";
import Moment from "moment";
import Loading from "/components/Loading";

export async function getServerSideProps() {
  const dataDoc = await getDoc(doc(db, "contents", "documents"));

  return {
    props: {
      docLists: JSON.stringify(Object.values(dataDoc.data())),
    }, // will be passed to the page component as props
  };
}

const Documents = ({ docLists }) => {
  docLists = JSON.parse(docLists);

  return (
    <>
      <Head>
        <title>OSP@USM | Documents</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="py-4 flex flex-col justify-center items-center gap-4">
        <div className="w-[90%] sm:w-[80%]">
          <div className="text-sm breadcrumbs">
            <ul>
              <li>
                <Link href="/discover">Discover</Link>
              </li>
              <li>Documents</li>
            </ul>
          </div>
          <h2 className="bg-base-100 rounded-full px-3 py-1 text-lg text-center mb-4 font-bold">
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
                {docLists.map((item, index) => (
                  <tr key={index}>
                    <th>{++index}</th>
                    <td>{item.name}</td>
                    <td>
                      {Moment.unix(item.created_at.seconds).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          window.open(item.url);
                        }}
                        className="btn btn-circle"
                      >
                        <AiOutlineCloudDownload size={20} />
                      </button>
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
