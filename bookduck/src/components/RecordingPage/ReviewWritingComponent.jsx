import WritingTemplate from "./WritingTemplate";
import PublicRange from "./PublicRange";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useReviewColorStore from "../../store/useReviewColorStore";
import Cards from "./Cards";
import cards from "../../assets/recordingPage/cards.svg";
const ReviewWritingComponent = ({
  inputValue,
  handleTextField,
  titleInputValue,
  bookTitleValue = "책제목",
  authorValue = "지은이",
  reviewPrivateShow,
  setReviewPrivateShow,
}) => {
  const { reviewColor } = useReviewColorStore();
  const navigate = useNavigate();
  const handleToggle = () => {
    setReviewPrivateShow(!reviewPrivateShow);
  };
  return (
    <>
      <div className="flex flex-col gap-[0.38rem]">
        <div className="flex items-center justify-between py-2">
          <div className="text-b1 font-semibold">감상평</div>
          <div className="flex gap-3">
            <PublicRange
              privateShow={reviewPrivateShow}
              setReviewPrivateShow={setReviewPrivateShow}
              handleToggle={handleToggle}
            />
            <div className="flex items-center cursor-pointer">
              {reviewColor ? (
                <Cards stroke={reviewColor} />
              ) : (
                <img src={cards} />
              )}
              <div
                onClick={() =>
                  navigate("/recording/decoration", {
                    state: {
                      textValue: inputValue,
                      titleValue: titleInputValue,
                      bookTitleValue: bookTitleValue,
                      authorValue: authorValue,
                    },
                  })
                }
                style={reviewColor ? { color: reviewColor } : undefined} // bgColor가 있을 때만 style 적용
                className={`text-b2 ${reviewColor ? "" : "text-gray-500"}`} // bgColor가 없을 때 gray-500 사용
              >
                카드색상
              </div>
            </div>
          </div>
        </div>
        <div onClick={handleTextField} className="cursor-pointer">
          <WritingTemplate height="14rem">
            <div className="flex flex-col gap-2">
              <input
                value={titleInputValue}
                placeholder="제목 (25자 이내로 작성하세요)"
                className="text-b1 font-semibold bg-transparent"
              />
              <textarea
                value={inputValue}
                className="w-[20.5625rem] h-[9rem] mt-2 bg-transparent text-b2 appearance-none outline-none resize-none"
                placeholder="책에 대한 자유로운 감상을 기록하세요"
              />
            </div>
          </WritingTemplate>
        </div>
      </div>
    </>
  );
};
export default ReviewWritingComponent;
