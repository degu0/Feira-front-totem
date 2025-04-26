import { useEffect, useState } from "react";
import logo from "../../../public/logo.png";
import { CustomSelect } from "../../components/CustomSelect";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";

export function Search() {
  const navigate = useNavigate();
  const [selectedValue, setSelectValue] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const [category, setCategory] = useState<string[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("http://localhost:3000/lojas");
        const data: { categoria: string[] }[] = await response.json();
        const categoryData = new Set(
          data.flatMap((loja:  { categoria: string[] }) => loja.categoria) 
        );
        setCategory(Array.from(categoryData));
      } catch (error) {
        console.error("Error ao carregar dados:", error);
      }
    };
    loadData();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    if(!inputValue) {
      navigate(`/busca?setor=${selectedValue.join(",")}`);
    }else {
      navigate(`/busca?categoria=${selectedValue.join(",")}`);
    }
  };

  return (
    <div className="w-screen h-screen flex items-start justify-center bg-gradient-to-t from-indigo-950 to-indigo-400">
      <div className="m-5 bg-white rounded h-[90%] w-[90%] flex flex-col items-center shadow-xl">
        <div className="flex flex-col justify-center items-center gap-10 w-full h-1/2">
          {" "}
          <input
            type="text"
            name="inputSearch"
            placeholder="Pesquisa nome de loja"
            value={inputValue}
            onChange={handleInputChange}
            className="border-2 border-black rounded text-black w-1/2 p-2"
          />
          <CustomSelect
            type="checkbox"
            title="Selecione as opções"
            values={category}
            onChange={(values) => {
              if (Array.isArray(values)) {
                setSelectValue(values);
              }
            }}
          />
        </div>
        <Button label="pesquisar" onClick={handleSearch} />
      </div>
    </div>
  );
}
