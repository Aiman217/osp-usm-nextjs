import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import _ from "lodash";

const Search = (props) => {
  const [searchInput, setSearchInput] = useState("");

  const updateSearchList = () => {
    if (_.isEmpty(searchInput)) {
      props.setSearchList(
        props.backupList.map((item) => {
          return item;
        })
      );
    }
    if (!_.isEmpty(props.searchList)) {
      if (_.isEmpty(searchInput)) {
        props.setSearchList(
          props.backupList.map((item) => {
            return item;
          })
        );
      } else {
        props.setSearchList(
          props.searchList.filter((val) => {
            if (searchInput === "") {
              return val;
            } else if (
              val.name.toLowerCase().includes(searchInput.toLowerCase())
            ) {
              return val;
            }
          })
        );
      }
    }
  };

  return (
    <>
      <div className="form-control">
        <label className="input-group">
          <input
            type="text"
            placeholder="Search..."
            onChange={(event) => {
              setSearchInput(event.target.value);
            }}
            className="input input-sm input-bordered"
          />
          <span onClick={updateSearchList} className="cursor-pointer rounded-tr-lg rounded-br-lg flex justify-center items-center">
            <AiOutlineSearch size={25} />
          </span>
        </label>
      </div>
    </>
  );
};

export default Search;
