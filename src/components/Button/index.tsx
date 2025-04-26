import React from "react";

type ButtonProps = {
  label: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      className="bg-indigo-500 py-2 px-10 rounded text-white mt-auto mb-5 cursor-pointer"
      onClick={onClick}
    >
      {label}
    </button>
  );
};
