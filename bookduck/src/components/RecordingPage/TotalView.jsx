import { useQuery } from "@tanstack/react-query";
import ExtractComponents from "./ExtractComponents";
import ReviewComponents from "./ReviewComponents";
import { getExtractReview } from "../../api/archive";
import { getUserId } from "../../api/oauth";

const TotalView = ({ font }) => {
  const userId = getUserId();
  const {
    data: archiveData,
    isError,
    error,
  } = useQuery({
    queryKey: ["archiveData"],
    queryFn: () => getExtractReview(userId, "ALL", 0, 20),
  });
  console.log(archiveData);
  return (
    <div className="flex flex-col gap-[1rem] items-center  mt-[1rem] ">
      {archiveData.archiveList.map((it, index) => (
        <>
          {it.type === "EXCERPT" ? (
            <ExtractComponents
              key={index}
              excerptData={it}
              archive={true}
              font={font}
            />
          ) : (
            <ReviewComponents
              key={index}
              reviewData={it}
              archive={true}
              font={font}
            />
          )}
        </>
      ))}
    </div>
  );
};
export default TotalView;
