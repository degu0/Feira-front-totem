import { NavLink } from "react-router-dom";
import { InputSearch } from "../../components/InputSearch";

export function TouchScreen() {
  return (
    <div className="bg-gradient-to-t from-indigo-950 to-indigo-400">
      <NavLink
        to="/Home"
        className="w-screen h-screen flex justify-center items-center text-center text-white"
      >
        <InputSearch />
      </NavLink>
    </div>
  );
}
