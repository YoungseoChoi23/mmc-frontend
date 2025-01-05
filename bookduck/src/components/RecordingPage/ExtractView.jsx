import { useQuery } from "@tanstack/react-query";
import { getExtractReview } from "../../api/archive";
import { getUserId } from "../../api/oauth";
import ExtractComponents from "./ExtractComponents";

const ExtractView = ({ font }) => {
  const userId = getUserId();
  const {
    data: archiveExcerptData,
    isError,
    error,
  } = useQuery({
    queryKey: ["archiveExcerptData"],
    queryFn: () => getExtractReview(userId, "EXCERPT", 0, 20),
  });

  return (
    <div className="flex flex-col gap-[1rem] items-center   mt-[1rem] ">
      {archiveExcerptData.archiveList.length === 0 ? (
        <div className="mt-[17rem] text-gray-400">
          아직 작성된 발췌 기록이 없어요!
        </div>
      ) : (
        archiveExcerptData.archiveList.map((it, index) => (
          <ExtractComponents
            key={index}
            excerptData={it}
            archive={true}
            font={font}
          />
        ))
      )}
    </div>
  );
};
export default ExtractView;
