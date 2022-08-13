import { useEffect, useState } from "react";
import _ from "lodash";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  collection,
  getDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "/firebase-config";
import { AiOutlineClose } from "react-icons/ai";
import UploadDocument from "./UploadDocument";

const CMS = ({ user }) => {
  const [annLists, setAnnLists] = useState([]);
  const [docLists, setDocLists] = useState([]);
  const [topicSelect, setTopicSelect] = useState("");
  const router = useRouter();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
  }, []);

  return (
    <>
      <Head>
        <title>OSP@USM | CMS</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="py-4 flex flex-col justify-center items-center gap-4">
        <div className="w-[90%] sm:w-[80%]">
          <div className="w-full flex flex-col sm:flex-row justify-center">
            <div className="stats shadow stats-vertical sm:stats-horizontal">
              <div className="stat place-items-center">
                <div className="stat-title">Total Announcements</div>
                <div className="stat-value">{annLists?.length}</div>
                <div className="stat-actions">
                  <label
                    htmlFor="my-modal-topic"
                    className="btn btn-sm btn-success modal-button"
                    onClick={() => {
                      setTopicSelect("announcement");
                    }}
                  >
                    Create
                  </label>
                </div>
              </div>
              <div className="stat place-items-center">
                <div className="stat-title">Total Documents</div>
                <div className="stat-value">{docLists?.length}</div>
                <div className="stat-actions">
                  <label
                    htmlFor="my-modal-topic"
                    className="btn btn-sm btn-success modal-button"
                    onClick={() => {
                      setTopicSelect("document");
                    }}
                  >
                    Upload
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        {!_.isEmpty(topicSelect) && (
          <div>
            <input
              type="checkbox"
              id="my-modal-topic"
              className="modal-toggle"
            />
            <div className="modal w-full">
              <div className="modal-box w-[90%] sm:w-[80%]">
                <label
                  htmlFor="my-modal-topic"
                  className="btn btn-sm btn-circle absolute right-2 top-2"
                  onClick={() => setTopicSelect("")}
                >
                  <AiOutlineClose size={20} />
                </label>
                {topicSelect === "document" ? <UploadDocument /> : []}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CMS;
