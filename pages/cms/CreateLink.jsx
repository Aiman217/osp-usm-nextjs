import { useState } from "react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import _ from "lodash";
import uniqid from "uniqid";
import { db } from "/firebase-config";
import { AiOutlineClose } from "react-icons/ai";

const CreateLink = () => {
  const [owner, setOwner] = useState("");
  const [desc, setDesc] = useState("");
  const [url, setUrl] = useState("");
  const [success, setSuccess] = useState("");

  const addLink = async () => {
    await setDoc(
      doc(db, "contents", "links"),
      {
        [uniqid()]: {
          owner: owner,
          desc: desc,
          url: url,
          created_at: serverTimestamp(),
        },
      },
      { merge: true }
    ).then(() => {
      setSuccess("Successfully created link.");
      setTimeout(() => {
        setSuccess("");
      }, 4000);
    });
  };

  return (
    <>
      <div className="form-control">
        <h1 className="text-lg font-bold uppercase text-center mt-4">
          Create Link
        </h1>
        <div className="divider p-0 m-0"></div>
        <label className="label">
          <span className="label-text">Owner</span>
        </label>
        <input
          onChange={(event) => {
            setOwner(event.target.value);
          }}
          type="text"
          placeholder="owner name"
          className="input input-bordered"
        />
        <div className="form-control">
          <label className="label">
            <span className="label-text">Desc</span>
          </label>
          <textarea
            onChange={(event) => {
              setDesc(event.target.value);
            }}
            className="textarea textarea-bordered h-24"
            placeholder="Desc"
          ></textarea>
        </div>
        <label className="label">
          <span className="label-text">URL</span>
        </label>
        <input
          onChange={(event) => {
            setUrl(event.target.value);
          }}
          type="text"
          placeholder="website url"
          className="input input-bordered"
        />
      </div>
      <div className="form-control">
        <button
          onClick={addLink}
          className={
            "btn btn-block btn-success mt-6 mb-16 " +
            (owner && desc && url ? " " : "btn-disabled")
          }
        >
          Create
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

export default CreateLink;
