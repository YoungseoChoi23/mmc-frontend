const CoverIcon = ({ handleClick, isClicked }) => {
  return (
    <svg
      onClick={() => handleClick("cover")}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="4"
        y="12.4209"
        width="7.57895"
        height="7.57895"
        rx="1.68421"
        fill={isClicked === "cover" ? "#636363" : "#E2E2E2"}
      />
      <rect
        x="12.4209"
        y="12.4209"
        width="7.57895"
        height="7.57895"
        rx="1.68421"
        fill={isClicked === "cover" ? "#636363" : "#E2E2E2"}
      />
      <rect
        x="12.4209"
        y="4"
        width="7.57895"
        height="7.57895"
        rx="1.68421"
        fill={isClicked === "cover" ? "#636363" : "#E2E2E2"}
      />
      <rect
        x="4"
        y="4"
        width="7.57895"
        height="7.57895"
        rx="1.68421"
        fill={isClicked === "cover" ? "#636363" : "#E2E2E2"}
      />
    </svg>
  );
};

export default CoverIcon;
