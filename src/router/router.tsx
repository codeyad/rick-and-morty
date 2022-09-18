import { BrowserRouter, Routes, Route } from "react-router-dom";
import Character from "./../pages/character";
import Episode from "./../pages/episode";
import Location from "../pages/location";
import App from "./../App";
import PageNotFound from "./../pages/404";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='character' element={<Character />} />
        <Route path='episode' element={<Episode />} />
        <Route path='location' element={<Location />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
