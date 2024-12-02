import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import polygon from "../../assets/characterPage/polygon.svg";
import right from "../../assets/characterPage/right.svg";
import help from "../../assets/characterPage/help-circle.svg";
import UserDuck from "../../components/CharacterPage/UserDuck";
import CharacterHeader from "../../components/CharacterPage/CharacterHeader";
import BottomNavbar from "../../components/common/BottomNavbar";
import LevelModal from "../../components/CharacterPage/LevelModal";
import { getUserId } from "../../api/oauth";
import { getUserInfo, getUserLevelInfo } from "../../api/character";

const CharacterPage = () => {
  const navigate = useNavigate();

  const handleBadgeClick = () => {
    navigate("/myBadge");
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const [userData, setUserData] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = getUserId();
        const res = await getUserLevelInfo(userId);
        const res2 = await getUserInfo(userId);
        console.log("조회성공: ", res);
        setUserData(res);
        setUserInfo(res2);
      } catch (err) {
        console.error("오류 발생: ", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (loading) {
    return <div className="text-center mt-10"></div>;
  }
  const expProgress =
    userData?.expInCurrentLevel === 0
      ? 0
      : Math.round(
          (userData?.expInCurrentLevel / userData?.expToNextLevel) * 100
        );
  return (
    <div className="flex flex-col justify-center items-center">
      <CharacterHeader />
      <div className="flex flex-col mt-[4.25rem] gap-1 w-full h-[23.125rem]">
        <div className="flex flex-col items-center">
          <div className="flex justify-center px-6 py-2 bg-gray-50 rounded-[6.25rem] text-b2 font-semibold text-gray-500 h-10">
            독서하기 좋은 날~
          </div>
          <img className="w-4 h-3 mt-[-0.0625rem]" src={polygon} />
        </div>
        <div className="flex mt-4 h-[20.625rem]">
          <UserDuck userId={getUserId()} />
        </div>
      </div>
      {/* 유저 정보  */}
      <div className="flex flex-col mt-11 p-4 gap-4 w-[22.5625rem]">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <div className="text-st font-semibold text-orange-400">
              레벨{userData?.level}
            </div>
            <div className="text-b1 font-semibold">{userInfo?.nickname}</div>
          </div>
          <div
            className="flex items-center gap-1 text-btn4 text-gray-400 cursor-pointer"
            onClick={toggleModal}
          >
            레벨업
            <img className="w-4 h-4" src={help} />
          </div>
          {isModalOpen && <LevelModal onClick={toggleModal} />}
        </div>
        <div className="flex items-center gap-4 w-[20.5625rem] h-6">
          <div className="bg-gray-100 rounded-[6.25rem] w-[17.875rem]">
            <div
              className={`bg-orange-gradation-level rounded-[6.25rem] h-5`}
              style={{ width: `${expProgress}%` }}
            />
          </div>
          <div className="text-b2 text-gray-400">{expProgress}%</div>
        </div>
      </div>

      {/* 나의 배지 */}
      <div
        className="flex justify-between my-4 px-5 py-3 bg-gray-10 rounded-xl w-[22.5625rem] cursor-pointer"
        onClick={handleBadgeClick}
      >
        <div className="text-b2 text-gray-500 font-semibold ">나의 배지</div>
        <img className="w-6 h-6" src={right} />
      </div>
      <BottomNavbar />
    </div>
  );
};

export default CharacterPage;
