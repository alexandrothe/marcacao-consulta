import { createRoutesFromElements, createBrowserRouter, Route, Routes,} from "react-router-dom";
import MarcarConsulta from "./pages/MarcarConsulta/MarcarConsulta";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import './App.scss'


export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Header />}>
        <Route path="" element={<Home />} />
        <Route path="marcar-consulta" element={<MarcarConsulta />}/>
        <Route path="profile" element={<Profile />}/>
      </Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/login" element={<Login />}></Route>
    </Route>
  )
);

