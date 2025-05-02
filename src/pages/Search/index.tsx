import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { useUserTracking } from "../../hooks/useUserTracking";

type Categoria = {
  id: string;
  nome: string;
};

type Loja = {
  id: string;
  nome: string;
};

export function Search() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState<string>("");

  const [category, setCategory] = useState<Categoria[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [stores, setStores] = useState<Loja[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/categoria")
      .then((res) => res.json())
      .then((data) => setCategory(data));
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    console.log(categoryId);

    fetch(`http://localhost:3000/lojas?categoria=${categoryId}`)
      .then((res) => res.json())
      .then((data) => setStores(data));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  useUserTracking();

  return (
    <div className="w-full min-h-screen flex flex-col items-center overflow-hidden">
      <div
        className="w-full h-[300px]"
        style={{
          backgroundImage: "url('/map-caruaru.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full max-w-xl">
          <h3 className="text-xl font-semibold mb-2">Categorias:</h3>
          <ul className="grid grid-cols-2 gap-2">
            {category.map((c) => (
              <li
                key={c.id}
                className="cursor-pointer p-2 border rounded hover:bg-gray-100"
                onClick={() => handleCategoryClick(c.id)}
              >
                {c.nome}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white w-full p-8 shadow-xl flex flex-col items-center gap-8">
        <input
          type="text"
          name="inputSearch"
          placeholder="Pesquisa nome de loja"
          value={inputValue}
          onChange={handleInputChange}
          className="border-2 border-black rounded text-black w-1/2 p-2"
        />

        {stores.length > 0 && (
          <div className="w-full max-w-xl mt-6">
            <h3 className="text-xl font-semibold mb-2">
              Lojas da categoria selecionada:
            </h3>
            <ul className="list-disc list-inside">
              {stores.map((store) => (
                <li key={store.id}>{store.nome}</li>
              ))}
            </ul>
          </div>
        )}

        <Button label="Pesquisar" onClick={() => navigate(`/busca?setor=${category}`)} />
      </div>
    </div>
  );
}
