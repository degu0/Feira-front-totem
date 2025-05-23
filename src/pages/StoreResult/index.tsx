import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/Button";
import { ModalStore } from "../../components/ModalStore";
import QrCode from "../../../public/qr_code.png";
import { useUserTracking } from "../../hooks/useUserTracking";

type Store = {
  id: string;
  nome: string;
  localizacao: string;
  nota: string;
  cor: string;
};

export function StoreResult() {
  const navigate = useNavigate();
  const [store, setStore] = useState<Store | null>(null);
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const corMap = {
    vermelho: "bg-red-500",
    azul: "bg-blue-500",
    verde: "bg-green-500",
    roxo: "bg-purple-500",
    rosa: "bg-pink-500",
  };

  useEffect(() => {
    async function loadData() {
      const response = await fetch(`http://localhost:3000/lojas/${id}`);
      const data = await response.json();
      if (response.ok) {
        setStore(data);
      } else {
        console.error("Erro no fetch de dados loja", data);
      }
    }
    loadData();
  }, [id]);

  useUserTracking();

  return (
    <div className="w-full min-h-screen flex flex-col items-center overflow-hidden relative bg-gray-200">
      <div
        className="w-full h-[500px] relative"
        style={{
          backgroundImage: "url('/map-caruaru.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute top-6 left-10">
          <Button label="Voltar" circle onClick={() => navigate(-1)} />
        </div>

        <div className="absolute top-6 right-10 bg-white py-5 px-8 rounded-2xl shadow-xl">
          <div className="flex flex-col justify-center items-center gap-2">
            <p className="text-gray-600 text-center font-semibold">
              Acesse pelo <br/> smartphone
            </p>
            <img src={QrCode} alt="QrCode" className="w-20" />
          </div>
        </div>
      </div>

      <div className="w-full flex-1 flex items-center justify-center px-4">
        {store ? (
          <div
            className="flex items-center py-4 px-6 justify-around bg-white rounded shadow-lg cursor-pointer w-full max-w-xl"
            key={store.id}
            onClick={() => setIsModalOpen(true)}
          >
            <div className="w-[30%] text-center flex gap-2">
              <div
                className={`py-1 px-1 rounded ${
                  corMap[store.cor] || "bg-amber-500"
                }`}
              />
              <p>Store {store.cor}</p>
            </div>
            <div className="w-[70%]">
              <p className="text-lg font-bold">{store.nome}</p>
              <p className="text-sm">{store.localizacao}</p>
            </div>
          </div>
        ) : (
          <p>Carregando...</p>
        )}

        <ModalStore
          showModalStore={isModalOpen}
          handleClose={() => setIsModalOpen(false)}
          idStore={id}
        />
      </div>
    </div>
  );
}
