import React, { useState } from "react";

type CustomSelectProps = {
  type: "checkbox" | "radio";
  title: string;
  values: string[];
  name?: string;
  onChange?: (selected: string[] | string) => void; 
};

export const CustomSelect: React.FC<CustomSelectProps> = ({
  type,
  title,
  values,
  name,
  onChange,
}) => {
  const [selected, setSelected] = useState<string[] | string>(
    type === "checkbox" ? [] : ""
  );

  const handleChange = (value: string) => {
    if (type === "checkbox") {
      const current = selected as string[];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      setSelected(updated);
      onChange?.(updated);
    } else {
      setSelected(value);
      onChange?.(value);
    }
  };

  return (
    <div className="w-full my-1">
      <h2 className="ml-2 mb-1 text-base font-semibold">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 px-2 mt-auto">
        {values.map((value, index) => {
          const id = `option-${value}`;
          const isChecked =
            type === "checkbox"
              ? (selected as string[]).includes(value)
              : selected === value;

          return (
            <div key={index} className="flex justify-center">
              <input
                type={type}
                id={id}
                className="hidden peer"
                value={value}
                name={name}
                checked={isChecked}
                onChange={() => handleChange(value)}
              />
              <label
                htmlFor={id}
                className="inline-flex items-center justify-center px-2 py-1.5 text-sm
                text-black bg-indigo-200 rounded cursor-pointer
                peer-checked:bg-indigo-600 peer-checked:text-white transition-colors"
              >
                {value}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};
