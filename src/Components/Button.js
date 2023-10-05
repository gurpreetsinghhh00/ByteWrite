import React from "react";

const Button = ({
  children,
  type = "button",
  bgColor = "bg-orange-400",
  textColor = "text-white",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`w-full hover:bg-orange-500 text-lg rounded-lg px-4 py-2 ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
