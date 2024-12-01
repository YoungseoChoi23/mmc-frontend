import { useEffect } from "react";
import useBookInfoStore from "../../store/useBookInfoStore";

const ColoredAuthorComponent = ({ bookInfo }) => {
  return (
    <>
      <div className="w-[22.5625rem] h-[3.5rem] p-4 rounded-[0.5rem] bg-orange-50">
        <div className="flex gap-1">
          <div className="text-b2 text-gray-800 font-semibold">
            {bookInfo.title}
          </div>
          <div className="text-b2 text-gray-800">/</div>
          <div className="text-b2 text-gray-800">{bookInfo.author}</div>
        </div>
      </div>
    </>
  );
};
export default ColoredAuthorComponent;
