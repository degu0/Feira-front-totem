import { Route, Routes } from "react-router-dom";
import { Search } from "../pages/Search";
import { TouchScreen } from "../pages/TouchScreen";
import { SearchResults } from "../pages/SearchResults";
import { PersonalInfo } from "../pages/PersonaInfo";

export function AppRouter() {
    return(
        <Routes>
            <Route path="/" element={<TouchScreen />} />
            <Route path="/Search" element={<Search />} />
            <Route path="/PersonalInfo" element={<PersonalInfo />} />
            <Route path="/Busca" element={<SearchResults />} />
        </Routes>
    )
}