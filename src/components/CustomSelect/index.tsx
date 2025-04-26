import React, { useState } from "react";

type CustomSelectProps = {
  type: "checkbox" | "radio";
  title: string;
  values: string[];
  name?: string;
  onChange?: (selected: string[] | string) => void; // permite capturar externamente também
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
    <div className="w-full">
      <h2 className="ml-3 mb-2 text-lg font-semibold">{title}</h2>
      <div className="flex gap-2 justify-evenly flex-wrap">
        {values.map((value, index) => {
          const id = `option-${value}`;
          const isChecked =
            type === "checkbox"
              ? (selected as string[]).includes(value)
              : selected === value;

          return (
            <div key={index}>
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
                className="inline-flex items-center justify-center px-3 py-2 text-sm
                text-black bg-indigo-200 rounded cursor-pointer border-none
                peer-checked:bg-indigo-600 peer-checked:text-white"
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
