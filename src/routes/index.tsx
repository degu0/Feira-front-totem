import { Route, Routes } from "react-router-dom";
import { Search } from "../pages/Search";
import { TouchScreen } from "../pages/TouchScreen";
import { PersonalInfo } from "../pages/PersonaInfo";
import { StoreResult } from "../pages/StoreResult";
import { CategorySelection } from "../pages/CategorySelection";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<TouchScreen />} />
      <Route path="/Search/:categoryId" element={<Search />} />
      <Route path="/PersonalInfo" element={<PersonalInfo />} />
      <Route path="/CategorySelection" element={<CategorySelection />} />
      <Route path="/StoreResult/:id" element={<StoreResult />} />
    </Routes>
  );
}
