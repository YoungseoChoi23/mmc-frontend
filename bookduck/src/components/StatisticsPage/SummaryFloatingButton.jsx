import { useEffect, useState } from "react";
import SummaryModal from "./SummaryModal";

const SummaryFloatingButton = () => {
  const [isVisible, setIsVisible] = useState(true); // 버튼 표시 여부 상태
  const [lastScrollY, setLastScrollY] = useState(0); // 마지막 스크롤 위치
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleClick = () => {
    setIsModalVisible(!isModalVisible);
  };
  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      // 스크롤 내릴 때
      setIsVisible(false);
    } else {
      // 스크롤 올릴 때
      setIsVisible(true);
    }

    setLastScrollY(currentScrollY); // 마지막 스크롤 위치 업데이트
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);
  return (
    <>
      <div
        className={`fixed bottom-10 flex justify-between items-center px-4 py-2.5 text-btn3 text-white  [background:rgba(18,18,18,0.70)] w-[22.5625rem] rounded-[6.25rem] cursor-pointer transition-transform duration-300
      }`}
        style={{
          transform: `translateY(${isVisible ? "0" : "calc(100% + 50px)"})`,
        }}
        onClick={handleClick}
      >
        요약된 이미지로 저장할 수 있어요
        <div className="px-3 py-1 font-semibold bg-blue-400 bg-opacity-90 rounded-[20px]">
          이미지 보기
        </div>
      </div>
      {isModalVisible && <SummaryModal onClose={handleClick} />}
    </>
  );
};
export default SummaryFloatingButton;
