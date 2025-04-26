import { NavLink } from "react-router-dom";

export function TouchScreen() {
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
