import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase-config";
import { AiOutlineCloudDownload } from "react-icons/ai";
import Moment from "moment";

const Discovery = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [docLists, setDocLists] = useState([]);
  const [annLists, setAnnLists] = useState([]);
  const tabList = ["Documents", "Announcements", "Tab 3"];

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
      <div className="w-[90%] mx-auto py-2">
        <div className="tabs flex justify-center items-center">
          {tabList.map((item, index) => (
            <button
              key={index}
              onClick={() => setCurrentTab(index)}
              className={
                "tab tab-lifted font-bold " +
                (currentTab === index ? "tab-active" : "")
              }
            >
              {item}
            </button>
          ))}
        </div>
        {/* Tab 1: Important Document */}
        <div
          className={
            "card card-bordered border-2 border-secondary " +
            (currentTab === 0 ? "visible static" : "invisible fixed")
          }
        >
          <div className="p-4">
            <h2 className="text-center text-xl sm:text-2xl font-bold">
              Important Documents
            </h2>
            <div className="divider" />
            <div className="overflow-x-scroll">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Created At</th>
                    <th>URL</th>
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
                        <button className="btn gap-2">
                          <AiOutlineCloudDownload size={20} />
                          <p className="hidden sm:block">Download</p>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* End of Tab 1 */}
        {/* Tab 2: Announcements */}
        <div
          className={
            "card card-bordered border-2 border-secondary " +
            (currentTab === 1 ? "visible static" : "invisible fixed")
          }
        >
          <div className="p-4">
            <h2 className="text-center text-xl sm:text-2xl font-bold">
              Announcements
            </h2>
            <div className="divider" />
            <div className="overflow-x-scroll">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th></th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {annLists.map((item, index) => (
                    <tr key={index}>
                      <th>{++index}</th>
                      <td>{item.title}</td>
                      <td>{item.desc.slice(0, 24) + "..."}</td>
                      <td>
                        {Moment.unix(item.created_at.seconds).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* End of Tab 2 */}
        {/* Tab 3: Events */}
        <div
          className={
            "card card-bordered border-2 border-secondary " +
            (currentTab === 2 ? "visible static" : "invisible absolute")
          }
        >
          <div className="card-body items-center text-center">
            <h2 className="card-title">Cookies!</h2>
            <p>We are using cookies for no reason.</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Upload</button>
            </div>
          </div>
        </div>
        {/* End of Tab 3 */}
      </div>
    </>
  );
};

export default Discovery;
