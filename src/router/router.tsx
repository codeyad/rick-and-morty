import { BrowserRouter, Routes, Route } from "react-router-dom";
import Character from "./../pages/character";
import Episode from "./../pages/episode";
import Location from "../pages/location";
import App from "./../App";
import PageNotFound from "./../pages/404";
import Template from "./../components/template";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function Router() {
  const [menuShown, setMenuShown] = useState(true);

  return (
    <Template>
      <BrowserRouter>
        <header>
          <nav>
            <div id='header-bar'>
              <img id='header-logo' src='img/logo-black.png' alt='' />
              <span>opener</span>
            </div>

            <ul>
              <li>
                <NavLink to='character'>Characters</NavLink>
              </li>
              <li>
                <NavLink to='location'>Locationa</NavLink>
              </li>
              <li>
                <NavLink to='episode'>Episodes</NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path='/' element={<App />} />
            <Route path='character' element={<Character />} />
            <Route path='episode' element={<Episode />} />
            <Route path='location' element={<Location />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </Template>
  );
}

export default Router;
