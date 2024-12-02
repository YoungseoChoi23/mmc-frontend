import SearchIcon from "../../assets/common/search-gray.svg?react";
import DeleteIcon from "../../assets/common/delete.svg?react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
const SearchComponent = ({
  placeholder = "검색어를 입력하세요",
  search,
  setSearch,
  onEnter,
  className,
  custom = false,
}) => {
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const clearSearch = () => {
    setSearch("");
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onEnter();
    }
  };

  return (
    <div
      className={classNames(
        "flex items-center w-[24.5625rem]  py-1 gap-2",
        className
      )}
    >
      <div
        className={`flex  ${
          custom ? "w-[22rem]" : "w-[19.5625rem]"
        } h-[2.5rem] bg-gray-50 items-center rounded-[0.5rem] px-2`}
      >
        <SearchIcon className=" text-gray-50 mr-2" />
        <input
          type="text"
          value={search}
          placeholder={placeholder}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className=" bg-gray-50 text-b1 text-black placeholder-gray-300 mr-[1.3125rem] w-[16rem]"
        />
        {search.length > 0 && (
          <button onClick={clearSearch}>
            <DeleteIcon className="w-[1rem] h-[1rem]" />
          </button>
        )}
      </div>
      {!custom && (
        <button
          onClick={handleCancel}
          className="text-btn2 text-gray800 w-auto px-[0.62rem] whitespace-nowrap"
        >
          취소
        </button>
      )}
    </div>
  );
};

export default SearchComponent;
