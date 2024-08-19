import { Route, Routes } from "react-router-dom";
import PageDashboard from "../../pages/dashboard";

export function HomeRouter(){
    return(
        <Routes>
            <Route path="/" element={<PageDashboard />} />
        </Routes>
    )
}