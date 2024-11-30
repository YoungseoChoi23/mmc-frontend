// 현재 달과 월별 책 개수를 props로 받을 예정(api 나와야 확실히 알것같음)
// 높이 상대적으로 달라짐 -> 최대 권수로 나눠서 %로 높이 적용?
// 1~6월까지 div다 만들어놓고(width가 다르니까)
// width는고정 height랑 현재 달에 따라 색깔 변화, 0일때랑 아닐때 구분해서 회전여부 결정
{
  /* 최대 높이 224px = 14rem
            최소 높이 112px = 7 rem
            0권일 때 4px = 0.25rem
            - 독서량이 0일 경우에는 모두 0도로 고정 */
}
const BookRecord = ({ userData, isFirstHalf }) => {
  const currentMonth = new Date().getMonth() + 1;
  const months = isFirstHalf ? [1, 2, 3, 4, 5, 6] : [7, 8, 9, 10, 11, 12];

  // 현재가 상반기인지 하반기인지 확인
  const isCurrentlyFirstHalf = currentMonth <= 6;

  // 현재까지의 월별 데이터 중 최대 권수 계산
  const maxBookCount = userData
    ? Math.max(...userData.map((data) => data.bookCount || 0))
    : 0;

  // 모든 월의 권수가 동일한지 체크
  const allSameCount =
    userData && userData.length > 0
      ? userData.every((data) => data.bookCount === userData[0].bookCount)
      : false;

  const calculateHeight = (bookCount) => {
    if (bookCount === 0) return "h-[0.25rem]";
    if (allSameCount) return "h-[7rem]";

    const minHeight = 112;
    const maxHeight = 224;
    const height =
      minHeight + (maxHeight - minHeight) * (bookCount / maxBookCount);
    return `h-[${height}px]`;
  };

  return (
    <div className="flex items-end text-b1 text-center text-white font-semibold w-full">
      {months.map((month, index) => {
        if (
          (isFirstHalf && !isCurrentlyFirstHalf) ||
          (!isFirstHalf && isCurrentlyFirstHalf) ||
          month > currentMonth ||
          (isFirstHalf && month > 6) ||
          (!isFirstHalf && month <= 6)
        ) {
          return null;
        }

        const monthData = userData?.find((data) => data.month === month);
        const isBeforeJoin = !monthData && month < currentMonth;
        const isCurrentMonthNoData = !monthData && month === currentMonth;
        const isZeroCount =
          !isBeforeJoin && (monthData?.bookCount === 0 || isCurrentMonthNoData);

        const baseClasses = [
          "ml-[6px] rounded-t-sm w-[32px]",
          "ml-[6px] rounded-t-sm w-[32px]",
          "ml-[7px] rounded-t-sm w-[43px]",
          "ml-[7px] rounded-t-sm w-[32px]",
          "ml-[10px] rounded-t-sm w-[36px]",
          "ml-[11px] rounded-t-sm w-[32px]",
        ];

        const rotateClass =
          month === currentMonth
            ? ""
            : isFirstHalf && month === 1
            ? "rotate-[5.223deg]"
            : isFirstHalf && month === 6
            ? "rotate-[-10.435deg]"
            : !isFirstHalf && month === 7
            ? "rotate-[5.223deg]"
            : !isFirstHalf && month === 12
            ? "rotate-[-10.435deg]"
            : "";

        const bgColor = isBeforeJoin ? "bg-gray-100" : "bg-orange-300";
        const height = isBeforeJoin
          ? "h-[7rem]"
          : calculateHeight(monthData?.bookCount || 0);

        return (
          <div key={month} className={`relative flex flex-col items-center`}>
            {isZeroCount && (
              <span className="absolute bottom-full left-[1.4375rem] text-gray-100 mb-1">
                0
              </span>
            )}
            <div
              className={`${baseClasses[index]} ${bgColor} ${height} ${rotateClass}`}
            >
              {!isZeroCount && !isBeforeJoin && (monthData?.bookCount || 0)}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default BookRecord;
