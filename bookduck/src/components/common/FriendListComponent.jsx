import React from "react";
import duck from "../../assets/common/duck.svg";
import ButtonComponent from "./ButtonComponent";
import badge from "../../assets/friendPage/badge.svg";
import UserDuck from "../../components/CharacterPage/UserDuck";

const FriendListComponent = ({
  image,
  userName,
  userId,
  text,
  isOfficial,
  handleClick,
  handleDelete,
  handleCancel,
  handleDecline,
  handleAccept,
}) => {
  //에러 핸들링
  const handleImageError = (e) => {
    e.target.src = duck;
  };

  //텍스트 조건 처리 함수
  const renderActionButton = () => {
    if (text === "none") {
      return null;
    }

    if (text === "삭제") {
      return (
        <button
          onClick={handleDelete}
          className="text-btn3 text-[#FFBF68] px-3 py-1"
        >
          삭제
        </button>
      );
    }
    if (text === "취소") {
      return (
        <button
          onClick={handleCancel}
          className="text-btn3 text-gray-400 px-3 py-1"
        >
          취소
        </button>
      );
    }

    if (text === "친구") {
      return <span className="text-blue-400 text-b2">친구</span>;
    }
  };

  // 버튼 그룹 컴포넌트
  const renderButtons = () => (
    <div className="flex gap-[0.62rem]">
      <ButtonComponent
        type="secondary"
        text="거절"
        color="gray"
        size="small"
        onClick={handleDecline}
      />
      <ButtonComponent
        type="secondary"
        text="수락"
        color="orange"
        size="small"
        onClick={handleAccept}
      />
    </div>
  );

  return (
    <div
      className="flex justify-between items-center px-4 py-[0.5rem] cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex items-center">
        <div className="w-[3.5rem] h-[3.5rem] mr-3">
          <UserDuck userId={userId} />
        </div>
        <span>{userName}</span>
        {isOfficial && <img src={badge} className="ml-1" />}
      </div>
      <div>{text ? renderActionButton() : renderButtons()}</div>
    </div>
  );
};

export default FriendListComponent;
