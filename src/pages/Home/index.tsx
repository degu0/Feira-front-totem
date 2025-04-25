import logo from "../../../public/logo.png";

export function Home() {
  return (
    <div className="w-screen h-screen flex items-start justify-center bg-gradient-to-t from-indigo-950 to-indigo-400">
      <div className="m-5 bg-white rounded h-[90%] w-[90%] flex flex-col items-center shadow-xl">
        <img src={logo} alt="Logo" className="w-20" />
        <div>
          <p>Seja Bem Vindo! O que você deseja?</p>
        </div>
        
      </div>
    </div>
  );
}
