import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import PageSignin from "./pages/signin";
import PageDashboard from "./pages/dashboard";
import PageCategories from "./pages/categories";
import EditCategory from "./pages/categories/edit";
import CreateCategory from "./pages/categories/create";
import { useEffect } from "react";
import { listen } from "./redux/listener";

function App() {
  useEffect(() => {
    listen();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageDashboard />} />
        <Route path="/signin" element={<PageSignin />} />
        <Route path="/categories" element={<PageCategories />} />
        <Route path="/categories/create" element={<CreateCategory />} />
        <Route path="/categories/edit/:id" element={<EditCategory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
