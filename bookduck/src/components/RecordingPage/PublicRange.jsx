import { useState } from "react";
import toggle_on from "../../assets/recordingPage/toggle-on.svg";
import toggle_off from "../../assets/recordingPage/toggle-off.svg";

const PublicRange = ({ privateShow, handleToggle }) => {
  return (
    <>
      <div
        onClick={handleToggle}
        className="flex items-center gap-2 cursor-pointer"
      >
        <div
          className={`${
            privateShow ? "text-special" : "text-gray-500"
          } text-b2`}
        >
          나만 보기
        </div>
        <div>
          {privateShow ? <img src={toggle_on} /> : <img src={toggle_off} />}
        </div>
      </div>
    </>
  );
};
export default PublicRange;
