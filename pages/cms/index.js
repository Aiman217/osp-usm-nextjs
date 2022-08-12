import { useEffect, useState } from "react";
import _ from "lodash";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDoc,
  doc,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";
import uniqid from "uniqid";
import { auth, db, storage } from "/firebase-config";
import { AiOutlineClose } from "react-icons/ai";

const CMS = ({ user }) => {
  const [name, setName] = useState("");
  const [document, setDocument] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  const addDocument = async (url) => {
    await addDoc(collection(db, "documents"), {
      name: name,
      created_at: serverTimestamp(),
      url: url,
    });
  };

  const uploadFile = () => {
    if (setDocument == null) return;
    const documentUploadRef = ref(
      storage,
      `documents/${uniqid(document.name)}`
    );
    uploadBytes(documentUploadRef, document).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        addDocument(url);
      });
    });
  };

  useEffect(() => {
    const getAdmins = async (uid) => {
      const dataAdmins = await getDoc(doc(db, "admins", uid));
      if (!dataAdmins.exists()) {
        router.push("/");
      }
    };
    onAuthStateChanged(auth, (currentUser) => {
      if (!_.isEmpty(currentUser)) {
        getAdmins(currentUser?.uid);
      } else {
        router.push("/");
      }
    });
  }, [user]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>OSP@USM | CMS</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
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
