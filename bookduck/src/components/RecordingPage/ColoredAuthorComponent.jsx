const ColoredAuthorComponent = ({ bookInfo, edit = false, author, title }) => {
  console.log(bookInfo);
  const bookTitle = bookInfo.bookUnitDto
    ? bookInfo.bookUnitDto?.title
    : bookInfo.title;
  const bookAuthor = bookInfo.bookUnitDto
    ? bookInfo.bookUnitDto?.author
    : bookInfo.author;
  return (
    <>
      <div className="w-[22.5625rem] h-[3.5rem] p-4 rounded-[0.5rem] bg-orange-50">
        <div className="flex gap-1">
          <div className="text-b2 text-gray-800 font-semibold">
            {edit ? title : bookTitle}
          </div>
          <div className="text-b2 text-gray-800">/</div>
          <div className="text-b2 text-gray-800">
            {edit ? author : bookAuthor}
          </div>
        </div>
      </div>
    </>
  );
};
export default ColoredAuthorComponent;
