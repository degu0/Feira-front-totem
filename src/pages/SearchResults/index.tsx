import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";

type Loja = {
  id: string;
  nome: string;
  nomeProprietario: string;
  categoria: string[];
  setor: string;
  endereco: string;
  horarioAberto: string;
  aberto: boolean;
};

export const SearchResults = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const categoria = queryParams.get("categoria");
  const setor = queryParams.get("setor");
  const [lojas, setLojas] = useState<Loja[]>([]);
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      try {
        let response;
        
        if (categoria && !setor) {
          response = await fetch(
            `http://localhost:3000/lojas?categoria_like=${categoria}`
          );
        } else if (!categoria && setor) {
          response = await fetch(
            `http://localhost:3000/lojas?setor_like=${setor}`
          );
        } else if (categoria && setor) {
          response = await fetch(
            `http://localhost:3000/lojas?categoria_like=${categoria}&setor_like=${setor}`
          );
        } else {
          response = await fetch(`http://localhost:3000/lojas`);
        }

        const data = await response.json();
        setLojas(data);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    loadData();
  }, [categoria, setor]);

  const handleOpenModal = () => {
      setShowModal(true)
  }
  const handleCloseModal = () => {
      setShowModal(false)
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-start p-10 bg-gradient-to-t from-indigo-950 to-indigo-400 text-white">
      <h1 className="text-2xl font-bold mb-6">Resultados</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {lojas.length ? (
          lojas.map((loj) => (
            <div
              key={loj.id}
              className="bg-white text-black p-4 rounded shadow w-full max-w-md mb-4"
            >
              <p>
                <strong>ID:</strong> {loj.id}
              </p>
              <p>
                <strong>Nome:</strong> {loj.nome}
              </p>
              <p>
                <strong>Proprietário:</strong> {loj.nomeProprietario}
              </p>
              <p>
                <strong>Categoria:</strong> {loj.categoria.join(", ")}
              </p>
              <p>
                <strong>Setor:</strong> {loj.setor}
              </p>
              <p>
                <strong>Endereço:</strong> {loj.endereco}
              </p>
              <p>
                <strong>Horário de Abertura:</strong> {loj.horarioAberto}
              </p>
              <p>
                <strong>Aberto:</strong> {loj.aberto ? "Sim" : "Não"}
              </p>
              <Button label="Qr Code" onClick={handleOpenModal} />
              <Modal showModal={showModal} handleClose={handleCloseModal} />
            </div>
          ))
        ) : (
          <div className="h-screen w-screen text-center">
            <p className="text-lg">Nenhum resultado encontrado.</p>
          </div>
          
        )}
      </div>
    </div>
  );
};
