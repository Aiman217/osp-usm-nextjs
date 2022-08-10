import { useEffect, useState } from "react";
import Link from "next/link";
import _ from "lodash";
import { useRouter } from "next/router";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "/firebase-config";
import { AiOutlineClose } from "react-icons/ai";

const CMS = ({ user }) => {
  const [title, setTitle] = useState("");
  const [document, setDocument] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  const addDocument = async () => {
    const dataDoc = await addDoc(collection(db, "documents"), {
      title: title,
      created_at: serverTimestamp(),
      url: "https://api.lorem.space/image/album?w=150&h=150",
    });
    console.log(dataDoc.id);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {console.log(user, title, document, serverTimestamp())}
      <div className="py-4 flex flex-col justify-center items-center gap-4">
        <div className="w-[90%] sm:w-[80%]">
          <div className="w-full flex-col sm:flex-row-reverse">
            <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
              <div className="card-body w-full">
                <div className="form-control">
                  <h1 className="text-lg font-bold uppercase text-center">
                    Upload Document
                  </h1>
                  <div className="divider p-0 m-0"></div>
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    onChange={(event) => {
                      setTitle(event.target.value);
                    }}
                    type="text"
                    placeholder="name"
                    className="input input-bordered"
                  />
                  <label className="label">
                    <span className="label-text">Document</span>
                  </label>
                  <input
                    onChange={(event) => {
                      setDocument(event.target.value);
                    }}
                    type="file"
                    accept="application/pdf"
                  />
                </div>
                <div className="form-control">
                  <button
                    onClick={addDocument}
                    className="btn btn-block btn-success mt-6"
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {!_.isEmpty(error) && (
          <div className="toast sm:mr-4">
            <div className="alert alert-error shadow-lg">
              <div>
                <span>{error}</span>
                <AiOutlineClose
                  onClick={() => setError("")}
                  size={20}
                  className="text-white cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CMS;
