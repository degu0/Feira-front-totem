type ButtonProps = {
  label: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  circle?: boolean;
};

export const Button: React.FC<ButtonProps> = ({ label, onClick, circle }) => {
  return (
    <button
      className={
        circle
          ? "w-14 h-14 flex items-center justify-center rounded-full bg-amber-700 text-white cursor-pointer"
          : "bg-amber-700 py-3 px-22 rounded-full text-white text-lg font-semibold cursor-pointer shadow-lg hover:bg-amber-900"
      }
      onClick={onClick}
    >
      {label}
    </button>
  );
};
