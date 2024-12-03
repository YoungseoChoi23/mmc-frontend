import { useEffect, useState } from "react";
import summary from "../../assets/statisticsPage/summary.svg";
import star from "../../assets/statisticsPage/star-summary.svg";
import divider from "../../assets/statisticsPage/divider.svg";
import { getExportSummaryInfo } from "../../api/statistics";
const getSeasonAndDateRange = (currentDate) => {
  const date = new Date(currentDate);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  if (month === 12) {
    return {
      dateRange: `${year}`, // 연말결산은 연도만 표시
    };
  }
  if (month >= 1 && month <= 2) {
    return {
      dateRange: `${year}.01${month === 2 ? `~${year}.02` : ""}`, // 1월: 01, 2월: 01~02
    };
  }
  if (month >= 3 && month <= 5) {
    return {
      dateRange: `${year}.03${
        month > 3 ? `~${year}.${String(month).padStart(2, "0")}` : ""
      }`,
    };
  }
  if (month >= 6 && month <= 8) {
    return {
      dateRange: `${year}.06${
        month > 6 ? `~${year}.${String(month).padStart(2, "0")}` : ""
      }`,
    };
  }
  if (month >= 9 && month <= 11) {
    return {
      dateRange: `${year}.09${
        month > 9 ? `~${year}.${String(month).padStart(2, "0")}` : ""
      }`,
    };
  }
};
const SummaryExport = () => {
  const [exportData, setExportData] = useState(null);
  const seasonDate = getSeasonAndDateRange(exportData?.currentDate);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getExportSummaryInfo();
        console.log("조회 성공: ", res);
        setExportData(res);
      } catch (err) {
        console.error("오류 발생: ", err);
      }
    };
    fetchData();
  }, []);
  return (
    <div
      className="relative flex flex-col items-center w-[285px] h-[430px]"
      style={{ backgroundImage: `url(${summary})` }}
    >
      <div className=" text-center mt-[27px] pr-[21px] text-st font-semibold">
        <span className="font-regular">{exportData?.nickname}</span>님의
        <br />
        {exportData?.season} 독서 리포트
      </div>
      <div className="mt-5 mb-[1.1431rem] pr-4 text-b2 text-gray-500 font-semibold rotate-[1.417deg]">
        Date {seasonDate?.dateRange}
      </div>
      <div className="relative flex flex-col pr-4 gap-2 text-gray-800 text-b2 font-semibold">
        <img className="w-[14.4375rem] h-[0.0625rem]" src={divider} />
        <div className="flex justify-between px-2 ">
          다 읽은 책<span>{exportData?.finishedBookCount} </span>
        </div>
        <img className="w-[14.4375rem] h-[0.0625rem]" src={divider} />
        <div className="flex flex-col px-2 gap-1">
          <div className="flex justify-between">
            선호하는 작가<span>{exportData?.mostReadAuthor}</span>
          </div>
          <div className="flex justify-between">
            선호하는 장르<span>{exportData?.mostReadGenre}</span>
          </div>
          <div className="flex justify-between">
            기록 키워드<span>{exportData?.keyword}</span>
          </div>
        </div>
        <img className="mb-0.5 w-[14.4375rem] h-[0.0625rem]" src={divider} />
        <div className="flex flex-col px-2 gap-1">
          <div className="flex justify-between">
            발췌<span>{exportData?.excerptCount}</span>
          </div>
          <div className="flex justify-between">
            감상<span>{exportData?.reviewCount}</span>
          </div>
          <div className="flex justify-between">
            TOTAL<span>{exportData?.bookRecordCount}</span>
          </div>
        </div>
        <img className="mt-0.5 w-[14.4375rem] h-[0.0625rem]" src={divider} />
      </div>
      <div className="absolute bottom-[1.375rem] left-[6.4063rem] flex items-center text-[0.6875rem] font-caprasimo text-gray-500 z-10 w-[3.75rem] h-[0.8125rem]">
        BookDuck
      </div>
      <img
        className="absolute bottom-[0.8125rem] left-[7.2813rem] w-[1.875rem] h-[1.875rem]"
        src={star}
      />
    </div>
  );
};
export default SummaryExport;
