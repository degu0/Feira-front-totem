import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { TouchScreen } from "../pages/TouchScreen";

export function AppRouter() {
    return(
        <Routes>
            <Route path="/" element={<TouchScreen />} />
            <Route path="/Home" element={<Home />} />
        </Routes>
    )
}