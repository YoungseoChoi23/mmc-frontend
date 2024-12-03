import React, { useEffect } from "react";
import music from "../../assets/mainPage/music.svg";
import bookCard from "../../assets/mainPage/bookcard.svg";
const BookDisplay = ({
  display = false,
  bookNumber = 1,
  type,
  cardId,
  cardIndex,
  imgPath1,
  imgPath2,
  text1,
  text2,
  text3,
}) => {
  return (
    <div className="w-[24.5625rem] relative">
      <div className="flex gap-2  w-full h-[6.9375rem]">
        {/* 첫 번째 북박스 */}
        <div className="flex justify-center items-center w-[5.0625rem] h-[6.8rem] bg-[#DDD] overflow-hidden  rounded-[0.4rem]">
          <img
            src={display || !imgPath1 ? bookCard : imgPath1}
            alt="Book Card"
            className={`${imgPath1 ? "object-cover w-full h-full" : ""}`}
          />
        </div>
        {/* 두 번째 북박스 */}
        {((display && bookNumber === 2) || imgPath2) && (
          <div className="flex justify-center items-center w-[5.0625rem] h-[6.8rem] bg-[#DDD] overflow-hidden rounded-[0.4rem]">
            <img
              src={display || !imgPath2 ? bookCard : imgPath2}
              alt="Book Card"
              className={`${imgPath2 ? "object-cover w-full h-full" : ""}`}
            />
          </div>
        )}
        {/* 음악 박스 */}
        <div
          className={`${
            (display && bookNumber === 2) || imgPath2
              ? "w-[10.8125rem]"
              : "w-[16.4375rem]"
          }
          py-3 px-4 flex flex-col justify-between bg-gray-10 shadow-custom rounded-[0.75rem]`}
        >
          {type === "BOOK_WITH_SONG" || display ? (
            <>
              <div className="relative flex flex-row justify-between ">
                <span className="text-c1 text-gray-500 mr-1 line-clamp-2">
                  {text3 || "책 제목"}
                </span>
                <img src={music} alt="Music Icon" />
              </div>
              <div className="relative flex flex-col items-end">
                <span className="text-gray-500 text-b1 font-semibold line-clamp-2">
                  {text2 || "노래 제목"}
                </span>
                <span className="text-right text-gray-800 text-c1 bg-gray-10 w-full line-clamp-1">
                  by {text1 || "가수명"}
                </span>
              </div>
            </>
          ) : (
            <p className="text-gray-800 text-c1 bg-gray-10 w-full line-clamp-5">
              {text1 || "메모"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDisplay;
