import { useState } from "react";
import { CustomSelect } from "../../components/CustomSelect";
import logo from "../../../public/logo.png";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useUserTracking } from "../../hooks/useUserTracking";

export function PersonalInfo() {
  const navigate = useNavigate();
  const [selectedValueRadio, setSelectValueRadio] = useState({
    tipo_usuario: "",
    genero: "",
    faixaEtaria: "",
  });

  const typeOfPublic = [
    { id: "1", nome: "Local" },
    { id: "2", nome: "Turistas" },
    { id: "3", nome: "Trabalhadores Locais" },
  ];

  const ageRanges = [
    { id: "1", nome: "0-12" },
    { id: "2", nome: "13-17" },
    { id: "3", nome: "18-24" },
    { id: "4", nome: "25-34" },
    { id: "5", nome: "35-44" },
    { id: "6", nome: "45-54" },
    { id: "7", nome: "55-64" },
    { id: "8", nome: "65+" },
  ];

  const genders = [
    { id: "1", nome: "Masculino" },
    { id: "2", nome: "Feminino" },
    { id: "3", nome: "Não Binário" },
    { id: "4", nome: "Prefere não dizer" },
  ];

  const handleCadastro = async () => {
    const { tipo_usuario, genero, faixaEtaria } = selectedValueRadio;
    console.log(selectedValueRadio);
    

    if (!tipo_usuario || !genero || !faixaEtaria) {
      alert("Por favor, preencha todas as opções.");
      return;
    }

    const payload = {
      id: Math.floor(Math.random() * 1000000).toString(),
      tipo_usuario,
      faixaEtaria,
      genero,
      criacao: new Date().toISOString(),
      atualizacao: new Date().toISOString(),
      ativo: true,
    };

    try {
      const response = await fetch("http://localhost:3000/totens-pessoais", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        navigate("/CategorySelection");
      } else {
        console.error("Erro", "Houve um problema ao cadastrar os dados.");
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    }
  };

  useUserTracking();

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
        <div className="w-full h-full bg-gray-200/50 flex flex-col items-center justify-center py-4 shadow-xl">
          <div className="w-[90%] max-w-xl flex flex-col items-center bg-white p-4 rounded shadow">
            <img src={logo} alt="Logo" className="w-20" />
            <div className="w-full flex flex-col justify-center items-center gap-2 mt-4">
              <CustomSelect
                type="radio"
                title="Selecione o tipo de público"
                values={typeOfPublic}
                name="typeOfPublic"
                onChange={(value) => {
                  if (Array.isArray(value)) return;
                    setSelectValueRadio((prev) => ({
                      ...prev,
                      tipo_usuario: value.nome,
                    }));
                }}
              />
              <CustomSelect
                type="radio"
                title="Selecione o gênero"
                values={genders}
                name="genders"
                onChange={(value) => {
                  if (Array.isArray(value)) return;
                    setSelectValueRadio((prev) => ({
                      ...prev,
                      genero: value.nome,
                    }));
                }}
              />
              <CustomSelect
                type="radio"
                title="Selecione a faixa etária"
                values={ageRanges}
                name="ageRanges"
                onChange={(value) => {
                  if (Array.isArray(value)) return;
                    setSelectValueRadio((prev) => ({
                      ...prev,
                      faixaEtaria: value.nome,
                    }));
                }}
              />
            </div>
          </div>
          <div className="mt-4">
            <Button label="Avançar" onClick={handleCadastro} />
          </div>
        </div>
      </div>
    </div>
  );
}
