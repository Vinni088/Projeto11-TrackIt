import TelaHoje from "./Paginas/TelaHoje";
import TelaLogin from "./Paginas/TelaLogin";
import TelaCadastro from "./Paginas/TelaCadastro";
import ComponenteTopo from "./Paginas/ComponenteTopo";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createContext, useState } from "react";

export const UserContext = createContext();

export default function App() {
  let [User, setUser] = useState(null);

  return (
    <UserContext.Provider value={{User,setUser}}>
      <ComponenteTopo/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TelaLogin />} />
          <Route path="/cadastro" element={<TelaCadastro />}/>
          <Route path="/hoje" element={<TelaHoje/>} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
    
  );
}
