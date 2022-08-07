import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "/firebase-config";
import { AiOutlineCloudDownload } from "react-icons/ai";
import Moment from "moment";

const Documents = () => {
  const [docLists, setDocLists] = useState([]);
  const [annLists, setAnnLists] = useState([]);

  useEffect(() => {
    // Fetch documents
    const docCollectionRef = collection(db, "documents");
    const getDocuments = async () => {
      const dataDoc = await getDocs(docCollectionRef);
      setDocLists(
        dataDoc.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };
    getDocuments();
    // Finish fetching documents
    // Fetch announcements
    const annCollectionRef = collection(db, "announcements");
    const getAnn = async () => {
      const dataAnn = await getDocs(annCollectionRef);
      setAnnLists(
        dataAnn.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };
    getAnn();
    // Finish fetching announcements
  }, []);

  return (
    <>
      <div className="w-[90%]">
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
    </>
  );
};

export default Documents;
