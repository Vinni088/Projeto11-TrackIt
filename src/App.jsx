import TelaLogin from "./Paginas/TelaLogin";
import TelaCadastro from "./Paginas/TelaCadastro";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      {/* Tudo que tiver uma rota entre Routes */}

      <Routes>
        <Route path="/" element={<TelaLogin />} />
        <Route path="/cadastro" element={<TelaCadastro />}/>
      </Routes>
    </BrowserRouter>
  );
}
