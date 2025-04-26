import { useState } from "react";
import { CustomSelect } from "../../components/CustomSelect";
import logo from "../../../public/logo.png";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";

export function PersonalInfo() {
  const navigate = useNavigate();
  const [selectedValueRadio, setSelectValueRadio] = useState({
    tipoPublico: "",
    genero: "",
    faixaEtaria: "",
  });

  const typeOfPublic = ["Local", "Turista", "Feirante"];
  const ageRanges = [
    "0-12",
    "13-17",
    "18-24",
    "25-34",
    "35-44",
    "45-54",
    "55-64",
    "65+",
  ];
  const genders = ["Masculino", "Feminino", "Não Binário", "Prefere não dizer"];

  const handleCadastro = async () => {
    const { tipoPublico, genero, faixaEtaria } = selectedValueRadio;

    if (!tipoPublico || !genero || !faixaEtaria) {
      alert("Por favor, preencha todas as opções.");
      return;
    }

    const payload = {
      id: Math.floor(Math.random() * 1000000).toString(),
      tipoPublico,
      genero,
      faixaEtaria,
    };

    try {
      const response = await fetch("http://localhost:3000/pessoal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        navigate("/Search");
      } else {
        console.error("Erro", "Houve um problema ao cadastrar os dados.");
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    }
  };

  return (
    <div className="w-screen h-screen flex items-start justify-center bg-gradient-to-t from-indigo-950 to-indigo-400">
      <div className="m-5 bg-white rounded h-[90%] w-[90%] flex flex-col items-center shadow-xl">
        <img src={logo} alt="Logo" className="w-20" />
        <div>
          <p className="text-xl font-bold text-indigo-600">Seja Bem Vindo! O que você deseja?</p>
        </div>
        <div className="w-full h-[60%] flex flex-col justify-center items-center gap-12">
          <CustomSelect
            type="radio"
            title="Selecione o tipo de público"
            values={typeOfPublic}
            name="typeOfPublic"
            onChange={(value) => {
              if (typeof value === "string") {
                setSelectValueRadio((prev) => ({ ...prev, tipoPublico: value }));
              }
            }}
          />
          <CustomSelect
            type="radio"
            title="Selecione o gênero"
            values={genders}
            name="genders"
            onChange={(value) => {
              if (typeof value === "string") {
                setSelectValueRadio((prev) => ({ ...prev, genero: value }));
              }
            }}
          />
          <CustomSelect
            type="radio"
            title="Selecione a faixa etária"
            values={ageRanges}
            name="ageRanges"
            onChange={(value) => {
              if (typeof value === "string") {
                setSelectValueRadio((prev) => ({ ...prev, faixaEtaria: value }));
              }
            }}
          />
        </div>

        <Button label="Confirmar" onClick={handleCadastro} />
      </div>
    </div>
  );
}
