const WritingTemplate = ({ height, children }) => {
  return (
    <div
      style={{ height: height }}
      className={`w-[22.5625rem] px-4 py-5 rounded-[0.5rem] bg-gray-50 `}
    >
      {children}
    </div>
  );
};
export default WritingTemplate;
