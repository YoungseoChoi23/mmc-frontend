import { useState } from "react";
import cover from "../../assets/bookinfoPage/cover.svg";
import down from "../../assets/common/down-arrow.svg";
import BottomSheetModal from "../common/BottomSheetModal";
import ListBottomSheet from "../common/ListBottomSheet";

const BookInfo = ({ isMe = "default", bookData }) => {
  const statusArr = ["읽고 싶어요", "읽고 있어요", "다 읽었어요", "중단했어요"];
  const [currentState, setCurrentState] = useState("읽고 싶어요");
  const [bottomSheetShow, setBottomSheetShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isCancel, setCancel] = useState(true);

  const handleStatusClick = () => {
    setBottomSheetShow(true);
  };

  const handleStatusChange = (status) => {
    setCurrentState(status);
  };

  const handlePutCancel = () => {};
  const bookBasicData =
    isMe === "default" ? bookData?.bookInfoBasicDto : bookData;
  console.log(bookBasicData);
  // 기본으로 등록되어 있는 책: default 내가 직접 등록한 책: me 타유저가 직접 등록한 책: other
  return (
    <div className="flex gap-4 w-[22.5625rem]">
      <img
        className="w-[7rem] h-[9.75rem] rounded bg-cover bg-no-repeat shadow-custom"
        src={bookBasicData?.imgPath}
        alt="Cover"
      />
      <div className={`flex flex-col justify-between py-2 w-full`}>
        <div
          className={`flex flex-col ${
            isMe === "other" ? "justify-center" : ""
          }  gap-1`}
        >
          <div className="text-t2 font-semibold">{bookBasicData?.title}</div>
          <div className="text-b1 h-6">{bookBasicData?.author}</div>
        </div>
        <div className="flex flex-col mt-1 justify-between h-full">
          {isMe === "other" ? (
            <div className="text-b2 text-orange-400">
              유저닉네임님이 등록한 책
            </div>
          ) : (
            <div
              className={`flex flex-col ${
                isMe === "other" ? "" : "justify-between h-full"
              }  `}
            >
              {isMe === "default" ? (
                <></>
              ) : (
                <div className="text-b2 text-orange-400">내가 등록한 책</div>
              )}

              <div
                className="flex py-1.5 text-b2 text-gray-500 "
                onClick={handleStatusClick}
              >
                {currentState}
                <img src={down} />
              </div>
              {bottomSheetShow && (
                <BottomSheetModal
                  bottomSheetShow={bottomSheetShow}
                  setBottomSheetShow={setBottomSheetShow}
                  visible={visible}
                  setVisible={setVisible}
                >
                  {" "}
                  <div className="px-4">
                    <ListBottomSheet
                      title="책 상태"
                      options={statusArr}
                      currentOption={currentState}
                      handleOption={handleStatusChange}
                      isCancel={isCancel}
                      handlePutCancel={handlePutCancel}
                    />
                  </div>
                </BottomSheetModal>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default BookInfo;
