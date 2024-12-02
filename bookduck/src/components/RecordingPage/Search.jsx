import { useState } from "react";
import BookListView from "../common/BookListView";
import SearchComponent from "../common/SearchComponent";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleRecording = () => {
    navigate("/recording");
  };

  return (
    <>
      <div className="p-4">
        <SearchComponent search={search} setSearch={setSearch} />
      </div>
      <div className="flex flex-col mx-4 mt-[0.5rem]">
        <BookListView edit={false} handleOnClick={handleRecording} />
        <BookListView edit={false} handleOnClick={handleRecording} />
      </div>
    </>
  );
};
export default Search;
