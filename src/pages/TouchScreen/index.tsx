import { useNavigate } from "react-router-dom";
import logo from "../../../public/logo.png";
import { Button } from "../../components/Button";

export function TouchScreen() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-t from-indigo-950 to-indigo-400">
      <div
        className="w-full h-screen"
        style={{
          backgroundImage: "url('/map-caruaru.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-white w-full h-3/12 shadow-lg flex items-center justify-center gap-20">
          <img src={logo} alt="Logo" className="w-20" />
          <h1 className="text-3xl font-semibold">
            Bem-Vindo à Feira Sulanca Inteligente!
          </h1>
        </div>
        
        <div className="fixed bottom-15 left-0 right-0 flex justify-center mb-4">
          <Button label="Iniciar" onClick={() => navigate("/PersonalInfo")} />
        </div>
      </div>
    </div>
  );
}
