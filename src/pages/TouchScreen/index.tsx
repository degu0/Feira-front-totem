// import { useEffect } from "react";
import { NavLink } from "react-router-dom";

export function TouchScreen() {
  // useEffect(() => {
  //   async function autoLogin() {
  //     const response = await fetch("http://127.0.0.1:8000/api-token-auth/", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         username: "totem",
  //         password: "feira123",
  //       }),
  //     });
  //     const data = await response.json();
  //     if (response.ok) {
  //       localStorage.setItem("token", data.token);
  //     } else {
  //       console.error("Erro no login automatico", data);
  //     }
  //   }
  //   autoLogin();
  // }, []);

  return (
    <div className="bg-gradient-to-t from-indigo-950 to-indigo-400">
      <NavLink
        to="/PersonalInfo"
        className="w-screen h-screen flex justify-center items-center text-center text-white font-bold text-8xl"
      >
        <h1>Toque na tela!</h1>
      </NavLink>
    </div>
  );
}
