import { useState } from "react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import _ from "lodash";
import uniqid from "uniqid";
import { db, storage } from "/firebase-config";
import { AiOutlineClose } from "react-icons/ai";

const UploadDocument = () => {
  const [name, setName] = useState("");
  const [document, setDocument] = useState(null);
  const [success, setSuccess] = useState("");

  const addDocument = async (url) => {
    await setDoc(
      doc(db, "contents", "documents"),
      {
        [uniqid()]: {
          name: name,
          created_at: serverTimestamp(),
          url: url,
        },
      },
      { merge: true }
    ).then(() => {
      setSuccess("Successfully upload document.");
      setTimeout(() => {
        setSuccess("");
      }, 4000);
    });
  };

  const uploadFile = () => {
    if (setDocument == null) return;
    const documentUploadRef = ref(
      storage,
      `documents/${uniqid(document?.name)}`
    );
    uploadBytes(documentUploadRef, document).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        addDocument(url);
      });
    });
  };

  return (
    <>
      <div className="form-control">
        <h1 className="text-lg font-bold uppercase text-center mt-4">
          Upload Document
        </h1>
        <div className="divider p-0 m-0"></div>
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          onChange={(event) => {
            setName(event.target.value);
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
            setDocument(event.target.files[0]);
          }}
          type="file"
          accept="application/pdf"
        />
      </div>
      <div className="form-control">
        <button
          onClick={uploadFile}
          className={
            "btn btn-block btn-success mt-6 mb-16 " +
            (document ? " " : "btn-disabled")
          }
        >
          Upload
        </button>
      </div>
      {!_.isEmpty(success) && (
        <div className="toast">
          <div className="alert alert-success shadow-lg">
            <div>
              <span className="text-sm sm:text-base">{success}</span>
              <AiOutlineClose
                onClick={() => setSuccess("")}
                size={20}
                className="text-white cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UploadDocument;
