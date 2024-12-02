import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import right from "../../assets/common/right.svg";
import cover from "../../assets/bookinfoPage/cover.svg";
import BookPlot from "./BookPlot";
import Divider1 from "../common/Divider1";
import Divider2 from "../common/Divider2";
import UserComment from "./UserComment";
import { getRelatedBookInfo } from "../../api/bookinfo";

const InfoView = ({ bookData, ratingData }) => {
  const { bookinfoId } = useParams();
  const images = [cover, cover, cover, cover, cover, cover, cover];
  const ratingList = ratingData?.oneLineRatingList || [];

  const navigate = useNavigate();
  const handleCommentClick = () => {
    navigate("/info/book/comment", { state: { ratingList } });
  };
  const [relatedBookData, setRelatedBookData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getRelatedBookInfo({ bookinfoId });
        console.log("조회 성공: ", res?.bookList);
        setRelatedBookData(res?.bookList);
      } catch (err) {
        console.error("오류 발생: ", err);
      }
    };
    fetchData();
  }, []);
  // 최대 3개만 표시
  const displayedRatings = ratingList.slice(0, 3);
  return (
    <div className="flex flex-col pb-[8rem] gap-5">
      <BookPlot bookData={bookData} />
      <Divider1 />
      {ratingList?.length > 0 && (
        <div className="flex flex-col items-center gap-1">
          <div className="flex px-4 text-b1 font-semibold justify-between items-center w-full">
            한줄평 ({ratingList?.length})
            <img
              className="cursor-pointer"
              src={right}
              onClick={handleCommentClick}
            />
          </div>
          {displayedRatings.map((oneLine, index) => (
            <div className="flex flex-col items-center" key={index}>
              <UserComment data={oneLine} />
              <div className="w-[22.5625rem]">
                <Divider2 />
              </div>
            </div>
          ))}
        </div>
      )}
      <Divider1 />
      {ratingList?.length > 0 && (
        <div className="flex flex-col px-4 gap-6 text-b1 font-semibold">
          이 책을 읽은 사용자들이 읽은 다른 책
          <div className="flex gap-3 overflow-x-scroll w-full">
            {relatedBookData.map((book, index) => (
              <div
                key={index}
                className="flex flex-col gap-2"
                style={{ width: "6.5rem", minWidth: "6.5rem" }}
              >
                <img
                  className="w-[6.5rem] h-[9.75rem] rounded-[0.25rem]"
                  src={book.imgPath}
                  alt={`book-cover-${index}`}
                />
                {book.title}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default InfoView;
