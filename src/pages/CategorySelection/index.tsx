import { CustomSelect } from "../../components/CustomSelect";
import logo from "../../../public/logo.png";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUserTracking } from "../../hooks/useUserTracking";

type Categoria = {
  id: string;
  nome: string;
};

export function CategorySelection() {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState({
    categoria: "",
  });

  const [categories, setCategories] = useState<{id: string; nome: string}[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch("http://localhost:3000/categoria");
        const data: Categoria[] = await response.json();

        if (response.ok) {
          if (Array.isArray(data)) {
            setCategories(data);
          } else {
            console.error("Resposta inválida da API:", data);
          }
        } else {
          console.error("Erro no fetch de dados da categoria:", data);
        }
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    }

    loadData();
  }, []);

  useUserTracking();

  const handleConfirmationNavigate = async () => {
    const { categoria } = selectedCategory;
    if (!categoria) {
      alert("Por favor, preencha uma opções de categoria.");
      return;
    }
    navigate(`/Search/${selectedCategory.categoria}`);
  };

  return (
    <div className="w-screen h-screen flex items-start justify-center bg-white">
      <div
        className="w-full h-screen"
        style={{
          backgroundImage: "url('/map-caruaru.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className=" w-full h-full bg-gray-200/50 flex flex-col items-center justify-center py-4 shadow-xl">
          <div className="w-[90%] max-w-xl flex flex-col items-center bg-white p-4 rounded shadow">
            <img src={logo} alt="Logo" className="w-20" />
            <div className="w-full flex flex-col justify-center items-center mt-4">
              <CustomSelect
                type="radio"
                title="Selecione o tipo de público"
                values={categories}
                name="category"
                onChange={(value) => {
                  if (Array.isArray(value)) return;
                  setSelectedCategory((prev) => ({
                    ...prev,
                    categoria: value.id,
                  }));
                }}
              />
            </div>
          </div>
          <div className="mt-4">
            <Button
              label="Gerar Minhas Recomendações"
              onClick={handleConfirmationNavigate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
