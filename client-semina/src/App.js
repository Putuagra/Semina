import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import { listen } from "./redux/listener";
import { AppRoutes } from "./Routes";

function App() {
  useEffect(() => {
    listen();
  }, []);
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
