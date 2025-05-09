import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserTracking } from "../../hooks/useUserTracking";

type Loja = {
  id: string;
  nome: string;
  localizacao: string;
  cor: string;
};

export function Search() {
  const navigate = useNavigate();
  const [query, setQuery] = useState<string>("");
  const { categoryId } = useParams();
  const [stores, setStores] = useState<Loja[]>([]);
  const [filteredStores, setFilteredStores] = useState<Loja[]>([]);

  const corMap: Record<string, string> = {
    vermelho: "bg-red-500",
    azul: "bg-blue-500",
    amarelo: "bg-yellow-500",
    rosa: "bg-pink-500",
    roxo: "bg-purple-500",
  };

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch(
          `http://localhost:3000/lojas?categoria=${categoryId}`
        );
        const data: Loja[] = await response.json();
        console.log(data);
        

        if (response.ok) {
          if (Array.isArray(data)) {
            const sortedData = data.sort((a, b) => a.nome.localeCompare(b.nome));
            setStores(sortedData);
            setFilteredStores(sortedData);
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
  }, [categoryId]);

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
    <div className="w-full min-h-screen flex flex-col">
      <div
        className="w-full h-[40vh]"
        style={{
          backgroundImage: "url('/map-caruaru.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
      </div>

      <div
        className="bg-gray-200 w-full flex-grow p-8 shadow-xl flex flex-col items-center gap-8"
        style={{ height: "60vh" }}
      >
        <div className="w-full max-w-4xl">
          <input
            type="text"
            placeholder="Pesquise o nome da loja"
            value={query}
            onChange={handleInputChange}
            className="border-2 border-none rounded text-black w-full p-3 bg-white shadow"
          />
        </div>

        <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg flex-grow overflow-hidden">
          <h3 className="text-2xl font-semibold my-4 text-center text-amber-700">
            Lojas disponíveis
          </h3>

          {filteredStores.length > 0 ? (
            <div className="h-[calc(100%-3.5rem)] overflow-y-auto">
              {filteredStores.map((store) => (
                <div
                  key={store.id}
                  className="flex items-center p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-200"
                  onClick={() => navigate(`/StoreResult/${store.id}`)}
                >
                  <div
                    className={`w-4 h-4 rounded-full ${corMap[store.cor]} mr-3`}
                  ></div>
                  <div className="flex-grow">
                    <p className="text-lg font-bold">{store.nome}</p>
                    <p className="text-sm text-gray-600">{store.localizacao}</p>
                  </div>
                  <div className="text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-gray-500">Nenhuma loja encontrada</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
