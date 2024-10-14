/* eslint-disable react/prop-types */
/*사용예시 
<ButtonComponent
  text="Disabled Primary"
  type="primary"
  disabled={true}
/>
<ButtonComponent
  text="Small Orange"
  type="secondary"
  color="orange"
  size="small"
  onClick={() => alert('메시지')}
/>
*/
const ButtonComponent = ({
  text,
  type = "primary",
  color = "gray",
  size = "medium",
  onClick,
  disabled = false,
  ...props
}) => {
  const baseStyles = "text-center";

  const primaryEnabledStyle = "bg-orange-400 text-white";
  const primaryDisabledStyle = "bg-gray-100 text-white cursor-not-allowed";

  const secondaryColorStyles = {
    orange: "bg-orange-300 text-white",
    white: "bg-white text-gray-600",
    gray: "bg-gray-600 text-white",
  };

  const sizeStyles = {
    small: "px-[0.75rem] py-[0.25rem] font-regular text-b3",
    medium: "px-[1rem] py-[0.5rem] font-regular text-base",
  };

  const buttonStyles =
    type === "primary"
      ? `${baseStyles} w-[22.5625rem] h-[3rem] font-semibold rounded-[0.5rem] ${
          disabled ? primaryDisabledStyle : primaryEnabledStyle
        }`
      : `${baseStyles} ${sizeStyles[size]} rounded-[0.375rem] ${secondaryColorStyles[color]}`;

  return (
    <button
      className={buttonStyles}
      onClick={!disabled ? onClick : null}
      disabled={disabled}
      {...props}
    >
      {text}
    </button>
  );
};

export default ButtonComponent;