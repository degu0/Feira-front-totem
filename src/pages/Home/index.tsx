import { useState } from "react";
import logo from "../../../public/logo.png";
import { CustomSelect } from "../../components/CustomSelect";


export function Home() {
  const [selectedValue, setSelectValue] = useState<string[]>([]);
  const [selectedValueRadio, setSelectValueRadio] = useState("");

  const values = ["Opção 1", "Opção 2", "Opção 3", "Opção 4"];
  const values2 = ["Opção 5", "Opção 6", "Opção 7", "Opção 8"];


  return (
    <div className="w-screen h-screen flex items-start justify-center bg-gradient-to-t from-indigo-950 to-indigo-400">
      <div className="m-5 bg-white rounded h-[90%] w-[90%] flex flex-col items-center shadow-xl">
        <img src={logo} alt="Logo" className="w-20" />
        <div>
          <p className="text-xl font-bold text-indigo-600">Seja Bem Vindo! O que você deseja?</p>
        </div>
        <CustomSelect type="checkbox" title="Selecione as opções" values={values} onChange={(values) => setSelectValue(values)}  />
        <CustomSelect type="radio" title="Selecione as opções" values={values2} name="name" onChange={(values) => setSelectValueRadio(values)}  />
        <p className="text-sm">
        CheckBox: {selectedValue || "Nenhuma"}
      </p>
        <p className="text-sm">
        Radio: {selectedValueRadio || "Nenhuma"}
      </p>
      </div>
    </div>
  );
}
