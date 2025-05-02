import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [query, setQuery] = useState<string>("");

  const [category, setCategory] = useState<Categoria[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [stores, setStores] = useState<Loja[]>([]);
  const [filteredStores, setFilteredStores] = useState<Loja[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/categoria")
      .then((res) => res.json())
      .then((data) => setCategory(data));
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setQuery("")

    fetch(`http://localhost:3000/lojas?categoria=${categoryId}`)
      .then((res) => res.json())
      .then((data) => {
        setStores(data);
        setFilteredStores(data);
      });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);

    if (value) {
      const filtered = stores.filter((item) =>
        item.nome.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredStores(filtered);
    } else {
      setFilteredStores(stores);
    }
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
        <div className="w-full flex justify-center items-center">
          <input
            type="text"
            placeholder="Pesquise o nome da loja"
            value={query}
            onChange={handleInputChange}
            className="border-2 border-black rounded text-black w-1/2 p-1.5"
          />
        </div>

        {selectedCategory ? (
          <div className="w-full max-w-xl mt-6">
            <h3 className="text-xl font-semibold mb-2">
              Lojas da categoria selecionada:
            </h3>
            <ul className="list-disc list-inside">
              {filteredStores.length > 0 ? (
                filteredStores.map((store) => (
                  <li key={store.id}>{store.nome}</li>
                ))
              ) : (
                <li className="text-gray-500">Nenhuma loja encontrada</li>
              )}
            </ul>
          </div>
        ) : (
          <div className="w-full max-w-xl mt-6">
            <h3 className="text-xl font-semibold mb-2">
              Selecione uma categoria
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}
