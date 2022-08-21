import { useState } from "react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import _ from "lodash";
import uniqid from "uniqid";
import { db } from "/firebase-config";
import { AiOutlineClose } from "react-icons/ai";

const CreateDiscussion = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [color, setColor] = useState("");
  const [type, setType] = useState("");
  const [success, setSuccess] = useState("");

  const labelList = [
    {
      color: "badge-info",
      type: "Information",
      btn: "btn-info",
    },
    {
      color: "badge-success",
      type: "Sharing",
      btn: "btn-success",
    },
    {
      color: "badge-warning",
      type: "Question",
      btn: "btn-warning",
    },
  ];

  const addDiscussion = async () => {
    await setDoc(doc(db, "discussion", uniqid()), {
      comments: [],
      created_at: serverTimestamp(),
      title: title,
      desc: desc,
      label: {
        color: color,
        type: type,
      },
    }).then(() => {
      setSuccess("Successfully created discussion.");
      setTimeout(() => {
        setSuccess("");
      }, 4000);
    });
  };

  return (
    <>
      <div className="form-control">
        <h1 className="text-lg font-bold uppercase text-center mt-4">
          Create Discussion
        </h1>
        <div className="divider p-0 m-0"></div>
        <label className="label">
          <span className="label-text">Title</span>
        </label>
        <input
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          type="text"
          placeholder="title"
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
        <div className="form-control">
          <label className="label">
            <span className="label-text">Label</span>
            <span className="label-text">Selected: {type}</span>
          </label>
          <div className="grid grid-cols-3 gap-4">
            {labelList.map((item, index) => (
              <button
                key={index}
                className={"btn btn-xs capitalize " + item.btn}
                onClick={() => {
                  setColor(item.color);
                  setType(item.type);
                }}
              >
                {item.type}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="form-control">
        <button
          onClick={addDiscussion}
          className={
            "btn btn-block btn-success mt-6 mb-16 " +
            (title && desc ? " " : "btn-disabled")
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

export default CreateDiscussion;
