import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import _ from "lodash";
import { db } from "/firebase-config";
import { AiOutlineRead, AiOutlineClose } from "react-icons/ai";
import Moment from "moment";

const Documents = () => {
  const [annLists, setAnnLists] = useState([]);
  const [annSelect, setAnnSelect] = useState([]);

  useEffect(() => {
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
      <div className="py-4 flex flex-col justify-center items-center gap-4">
        <div className="w-[90%] sm:w-[80%]">
          <h2 className="bg-base-100 rounded-full px-3 py-1 text-lg text-center mb-4 font-bold">
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
                {annLists.map((item, index) => (
                  <tr key={index}>
                    <th>{++index}</th>
                    <td>{item.title}</td>
                    <td>{item.desc.substring(0, 24) + "..."}</td>
                    <td>
                      {Moment.unix(item.created_at.seconds).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
                    </td>
                    <td>
                      <label
                        htmlFor="my-modal-3"
                        className="btn btn-circle modal-button"
                        onClick={() => {
                          setAnnSelect(item);
                        }}
                      >
                        <AiOutlineRead size={20} />
                      </label>
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
    </>
  );
};

export default Documents;
