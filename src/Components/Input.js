import React, { useId } from "react";

const Input = React.forwardRef(
  ({ label, className = "", type = "text", ...props }, ref) => {
    const id = useId();
    return (
      <div className="w-full">
        {label && (
          <label className="mb-1 pl-1" id={id}>
            {label}
          </label>
        )}
        <input
          type={type}
          className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-100 border-2 border-gray-200 w-full ${className}`}
          ref={ref}
          {...props}
          id={id}
        />
      </div>
    );
  }
);

export default Input;
