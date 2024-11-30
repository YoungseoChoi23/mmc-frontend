import noCheck from "../../assets/characterPage/check-no.svg";
import yesCheck from "../../assets/characterPage/check-yes.svg";
import lock from "../../assets/characterPage/lock.svg";
import Item from "./Item";
const Skin = ({ item, onItemSelect, isSelected }) => {
  const handleClick = () => {
    onItemSelect(item);
  };

  return (
    <div className="w-[110px] h-[110px] rounded-[12px]" onClick={handleClick}>
      {item.isOwned ? (
        <div
          className="relative flex justify-center items-center bg-gray-300 w-[110px] h-[110px] rounded-[12px] cursor-pointer"
          onClick={handleClick}
        >
          <Item itemType={item.itemType} itemName={item.itemName} />
          <img
            className="absolute top-2 left-2"
            src={isSelected ? yesCheck : noCheck}
          />
        </div>
      ) : (
        <div className="flex justify-center items-center bg-gray-50 w-[110px] h-[110px] rounded-[12px]">
          <img className="w-5 h-6" src={lock} />
        </div>
      )}
    </div>
  );
};
export default Skin;
