import logo from "../../assets/statisticsPage/bookduck.svg";
import UserDuck from "../CharacterPage/UserDuck";
import { getUserId } from "../../api/oauth";
const ExportCharacter = () => {
  return (
    <div className="flex flex-col items-center bg-yellow-gradation w-[20.1875rem] h-[31.875rem] rounded-[1.6627rem]">
      <img src={logo} className="mt-[39px] w-[6.3125rem] h-[1.3125rem]" />
      <div className=" mt-[1.125rem] text-st text-gray-800 font-semibold">
        여덟글자잖아요오님은
        <br />
        문학에 진심인 문학덕!
      </div>
      <div className="mt-[3rem] w-[253px] h-[258px]">
        <UserDuck userId={getUserId()} />
      </div>
      <div className="mt-6 text-btn3 text-gray-400">
        #슬픈 #아름다운 #귀여운
      </div>
    </div>
  );
};
export default ExportCharacter;
