import { useState } from "react";
import starNo from "../../assets/bookinfoPage/star-small-no.svg";
import starYes from "../../assets/bookinfoPage/star-small-yes.svg";
import starHalf from "../../assets/bookinfoPage/star-small-half.svg";
import heartNo from "../../assets/bookinfoPage/heart-no.svg";
import heartYes from "../../assets/bookinfoPage/heart-yes.svg";
import { enrollLike, deleteLike } from "../../api/bookinfo";
import { getUserId } from "../../api/oauth";

const UserComment = ({ data }) => {
  //날짜 포맷
  const formattedDate = data?.createdTime.split("T")[0].replace(/-/g, ".");
  const [isLiked, setIsLiked] = useState(data?.isLiked || false);
  const [likeCount, setLikeCount] = useState(data?.oneLineLikeCount || 0);
  const userId = getUserId();
  const handleLikeClick = async (onelineId) => {
    try {
      if (isLiked) {
        //좋아요 취소
        setIsLiked(false);
        setLikeCount(likeCount - 1);
        await deleteLike(onelineId);
      } else {
        //좋아요 등록
        setIsLiked(true);
        setLikeCount(likeCount + 1);
        await enrollLike(onelineId);
      }
    } catch (error) {
      console.error("좋아요 처리 실패:", error);
    }
  };

  return (
    <div className="flex flex-col p-4 gap-1.5 text-b2 w-[24.5625rem]">
      <div className="flex flex-col gap-3">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }, (_, index) => {
            let starSrc = starNo;
            if (data?.rating > index) {
              starSrc = data?.rating >= index + 1 ? starYes : starHalf;
            }
            return <img key={index} src={starSrc} alt="star" />;
          })}
        </div>
        {data?.oneLineContent}
      </div>
      <div className="flex justify-between items-center text-btn4 text-gray-500">
        <div className="flex gap-2.5">
          {userId === data.userId ? (
            <span className="text-orange-400">나의 한줄평</span>
          ) : (
            <span className=" underline cursor-pointer">
              {data?.userNickname}
            </span>
          )}
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center gap-1">
          <img
            src={isLiked ? heartYes : heartNo}
            onClick={() => handleLikeClick(data.oneLineId)}
          />
          <span className="text-right text-btn4 text-gray-800 w-5">
            {likeCount}
          </span>
        </div>
      </div>
    </div>
  );
};
export default UserComment;
