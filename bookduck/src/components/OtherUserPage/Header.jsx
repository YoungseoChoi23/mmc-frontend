import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import backIcon from "../../assets/otherUserPage/back.svg";
const Header = ({
  userRelationshipStatus,
  handleAddClick,
  handleDelFriendClick,
  handleDelRequestClick,
  handleAcceptClick,
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log("관계", userRelationshipStatus);
  }, []);
  const renderButton = (userRelationshipStatus) => {
    switch (userRelationshipStatus) {
      case "FRIEND":
        return (
          <button
            className="py-1 px-3 bg-orange-50 rounded-[0.375rem]"
            onClick={handleDelFriendClick}
          >
            <span className="text-orange-400 text-btn3">친구삭제</span>
          </button>
        );
      case "NONE":
        return (
          <button
            className="py-1 px-3 bg-blue-400 rounded-[0.375rem]"
            onClick={handleAddClick}
          >
            <span className="text-white text-btn3">친구추가</span>
          </button>
        );
      case "PENDING_REQUEST":
        return (
          <button
            className="py-1 px-3 bg-[#DDD] rounded-[0.375rem]"
            onClick={handleDelRequestClick}
          >
            <span className="text-white text-btn3">요청취소</span>
          </button>
        );
      case "PENDING_ACCEPT":
        return (
          <button
            className="py-1 px-3 bg-blue-400 rounded-[0.375rem]"
            onClick={handleAcceptClick}
          >
            <span className="text-white text-btn3">요청수락</span>
          </button>
        );
      case "REQUEST_DISABLED":
        return (
          <button className="py-1 px-3 bg-[#DDD] rounded-[0.375rem] pointer-events-none">
            <span className="text-white text-btn3">요청불가</span>
          </button>
        );
      default:
        return null;
    }
  };
  return (
    <div className="flex items-center justify-between w-full h-[2.75rem] px-4">
      <button onClick={() => navigate(-1)} className="w-[1rem]">
        <img src={backIcon} />
      </button>
      {renderButton(userRelationshipStatus)}
    </div>
  );
};

export default Header;
