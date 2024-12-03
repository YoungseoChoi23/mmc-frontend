import { useNavigate } from "react-router-dom";
import closeIcon from "../../assets/statisticsPage/close.svg";
import shareIcon from "../../assets/statisticsPage/share.svg";

const SummaryModal = ({ onClose }) => {
  const navigate = useNavigate();
  const handleCharacterClick = () => {
    navigate(`/statistics/export/character`);
  };
  const handleSummaryClick = () => {
    navigate(`/statistics/export/summary`);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="flex flex-col p-2.5 items-center bg-white w-72 h-[193px] rounded-2xl">
        <div className="flex justify-end items-end w-full">
          <img
            src={closeIcon}
            alt="close"
            className="cursor-pointer"
            onClick={onClose}
          />
        </div>
        <span className="text-st font-semibold mb-5">
          어떤 이미지로 저장할까요?
        </span>
        <div className="flex flex-col mb-2.5 gap-3 text-btn2 font-semibold text-white">
          <button
            className="flex justify-center items-center gap-2.5 bg-gray-600 px-5 py-3 rounded-lg"
            onClick={handleCharacterClick}
          >
            캐릭터 이미지로 저장하기
            <img src={shareIcon} alt="share" className="w-5 h-5" />
          </button>
          <button
            className="flex justify-center items-center gap-2.5 bg-orange-300 px-5 py-3 rounded-lg"
            onClick={handleSummaryClick}
          >
            통계 요약 이미지로 저장하기
            <img src={shareIcon} alt="share" className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default SummaryModal;
