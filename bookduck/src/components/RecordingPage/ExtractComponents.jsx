import { useNavigate } from "react-router-dom";
import { getDetailExtractReview } from "../../api/archive";
import { getUserId } from "../../api/oauth";

const ExtractComponents = ({ excerptData, archive = false }) => {
  console.log(excerptData);
  const createdDate = excerptData?.data.createdTime
    .split("T")[0]
    .replace(/-/g, ".");
  console.log(excerptData);
  const archiveId = excerptData.archiveId;
  const excerptId = excerptData.data.excerptId;
  const title = excerptData?.title;
  const author = excerptData?.author;
  const content = excerptData?.data.excerptContent;
  const page = excerptData?.data.pageNumber;
  const navigate = useNavigate();

  const handleOnClick = async () => {
    const res = await getDetailExtractReview(archiveId);
    const typeState =
      res.excerpt && res.review ? "ALL" : res.excerpt ? "EXCERPT" : "REVIEW";
    console.log("123132");
    if (typeState === "ALL")
      navigate(`/total-archive-detail/${archiveId}`, {
        state: { detailData: res },
      });
    if (typeState === "EXCERPT")
      navigate(`/excerpt-archive-detail/${archiveId}`, {
        state: { detailData: res },
      });
  };

  return (
    <div onClick={handleOnClick} className="cursor-pointer">
      <div className="flex flex-col gap-[1.25rem] w-[22.5625rem]  p-[1.25rem] rounded-[0.875rem] bg-gray-10 shadow-custom">
        {!archive && createdDate ? (
          <>
            <div className="flex justify-between items-center">
              <div className="text-c2 text-gray-400">{createdDate}</div>
              <div className="text-right justify-end items-end text-b2 text-gray-400">
                {excerptData?.pageNumber || "54"}p
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="text-right text-b2 text-gray-400">{page}p</div>
            <div className="flex flex-col gap-[0.5rem]">
              <div className="text-b2 text-gray-800">{content} </div>
              <div className="text-c2 text-gray-400">
                {title && author && `${title} / ${author}`}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default ExtractComponents;
