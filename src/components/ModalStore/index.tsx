import { useEffect, useState } from "react";

interface ModalStoreProps {
  showModalStore: boolean;
  handleClose: () => void;
  idStore: string;
}

type Store = {
  id: string;
  nome: string;
  localizacao: string;
  nota: number;
  descricao: string;
  horario_funcionamento: string;
  redes_sociais: string;
  cor: string;
  categoria: number;
  produtos: number[];
};

export const ModalStore: React.FC<ModalStoreProps> = ({ 
  showModalStore, 
  handleClose, 
  idStore 
}) => {
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!showModalStore) return;

    async function loadData() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:3000/lojas/${idStore}`);
        if (!response.ok) {
          throw new Error('Erro ao carregar dados da loja');
        }
        const data = await response.json();
        setStore(data);
      } catch (err) {
        console.error("Erro no fetch de dados loja", err);
        setError('Não foi possível carregar as informações da loja');
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, [idStore, showModalStore]);

  if (!showModalStore) {
    return null;
  }

  const getCategoryName = (categoryId: number) => {
    const categories = {
      1: "Moda Masculina",
      2: "Esportes",
      3: "Artesanato",
      4: "Alimentação",
      5: "Eletrônicos"
    };
    return categories[categoryId as keyof typeof categories] || "Outros";
  };


  const formatSocialMedia = (social: string) => {
    return social.split(' ').map((handle, index) => (
      <a 
        key={index} 
        href={`https://instagram.com/${handle.replace('@', '')}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline mr-2"
      >
        {handle}
      </a>
    ));
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-xl mx-4">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-800"
          aria-label="Fechar modal"
        >
          &times;
        </button>
        
        {loading && (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        )}

        {error && (
          <div className="text-center py-8 text-red-500">
            {error}
          </div>
        )}

        {store && !loading && (
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800">{store.nome}</h2>
              <div 
                className={`w-16 h-1 mx-auto my-2 rounded-full bg-${store.cor}-500`}
                style={{ backgroundColor: store.cor }}
              ></div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start">
                <span className="font-semibold w-32">Descrição:</span>
                <p className="flex-1 text-gray-700">{store.descricao}</p>
              </div>

              <div className="flex items-center">
                <span className="font-semibold w-32">Localização:</span>
                <p className="flex-1 text-gray-700">{store.localizacao}</p>
              </div>

              <div className="flex items-center">
                <span className="font-semibold w-32">Horário:</span>
                <p className="flex-1 text-gray-700">{store.horario_funcionamento}</p>
              </div>

              <div className="flex items-center">
                <span className="font-semibold w-32">Categoria:</span>
                <p className="flex-1 text-gray-700">
                  {getCategoryName(store.categoria)}
                </p>
              </div>

              <div className="flex items-center">
                <span className="font-semibold w-32">Avaliação:</span>
                <div className="flex-1 flex items-center">
                  <div className="relative w-24">
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 rounded-full bg-yellow-500" 
                        style={{ width: `${(store.nota / 10) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="ml-2 text-gray-700">{store.nota}/10</span>
                </div>
              </div>

              <div className="flex items-start">
                <span className="font-semibold w-32">Redes Sociais:</span>
                <div className="flex-1">
                  {formatSocialMedia(store.redes_sociais)}
                </div>
              </div>

              <div className="flex items-start">
                <span className="font-semibold w-32">Produtos:</span>
                <p className="flex-1 text-gray-700">
                  {store.produtos.length} itens disponíveis
                </p>
              </div>
            </div>

            <div className="pt-4 flex justify-center">
              <button
                onClick={handleClose}
                className="px-6 py-2 bg-amber-700 text-white rounded-md hover:bg-amber-800 transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};