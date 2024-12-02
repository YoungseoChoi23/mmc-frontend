import { useQuery } from "@tanstack/react-query";
import { getExtractReview } from "../../api/archive";
import { getUserId } from "../../api/oauth";
import ReviewComponents from "./ReviewComponents";

const ReviewView = () => {
  const userId = getUserId();
  const {
    data: archiveReviewData,
    isError,
    error,
  } = useQuery({
    queryKey: ["archiveReviewData"],
    queryFn: () => getExtractReview(userId, "REVIEW", 0, 20),
  });
  return (
    <div className="flex flex-col gap-[1rem] items-center mt-[1rem]">
      {archiveReviewData.archiveList.map((it, index) => (
        <ReviewComponents key={index} reviewData={it} archive={true} />
      ))}
    </div>
  );
};
export default ReviewView;
