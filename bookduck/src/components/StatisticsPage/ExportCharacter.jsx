import { useState, useEffect } from "react";
import logo from "../../assets/statisticsPage/bookduck.svg";
import UserDuck from "../CharacterPage/UserDuck";
import { getUserId } from "../../api/oauth";
import { getExportCharacterInfo } from "../../api/statistics";
const ExportCharacter = () => {
  const [characterInfo, setCharacterInfo] = useState(null);

  const genreToKorean = {
    FICTION: "소설",
    LITERARY: "시/에세이",
    BUSINESS: "경제/경영",
    SELF_HELP: "자기계발",
    SCIENCE: "과학",
    SOCIETY: "정치/사회",
    LANGUAGE: "언어",
    TRAVEL: "여행",
    HISTORY: "역사",
    COMPUTER: "컴퓨터/IT",
    HEALTH: "건강/스포츠",
    HOBBY: "취미/실용",
    ART: "예술",
    RELIGION: "종교",
    COMICS: "만화",
    HOME_COOKING: "가정/요리",
    ARCHITECTURE: "건축",
    REFERENCE: "교재/참고서",
    TECHNOLOGY: "기술/공학",
    HUMANITIES: "인문",
    YOUTH: "아동/청소년",
    OTHERS: "기타",
  };
  const convertedGenre = genreToKorean[characterInfo?.duckTitle] || "기타";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getExportCharacterInfo();
        console.log("조회성공: ", res);
        setCharacterInfo(res);
      } catch (err) {
        console.error("오류 발생: ", err);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="flex flex-col items-center bg-yellow-gradation w-[20.1875rem] h-[31.875rem] rounded-[1.6627rem]">
      <img src={logo} className="mt-[39px] w-[6.3125rem] h-[1.3125rem]" />
      <div className=" mt-[1.125rem] text-st text-center text-gray-800 font-semibold">
        {characterInfo?.nickname || "북덕"}님은
        <br />
        {convertedGenre}에 진심인 {convertedGenre}덕!
      </div>
      <div className="mt-[3rem] w-[253px] h-[258px]">
        <UserDuck userId={getUserId()} />
      </div>
      <div className="mt-6 text-btn3 text-gray-400">
        #{characterInfo?.keywords[0] || "슬픈"} #
        {characterInfo?.keywords[1] || "아름다운"} #
        {characterInfo?.keywords[2] || "귀여운"}
      </div>
    </div>
  );
};
export default ExportCharacter;
