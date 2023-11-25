import { createRoutesFromElements, createBrowserRouter, Route, Routes} from "react-router-dom";
import MarcarConsulta from "./pages/MarcarConsulta/MarcarConsulta";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import './App.scss'


export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
      <Route path="home" element={<Home />} />
      <Route path="marcar-consulta" element={<MarcarConsulta />}/>
      <Route path="profile" element={<Profile />}/>
    </Route>
  )
);

