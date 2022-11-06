import { BrowserRouter, Routes, Route } from "react-router-dom";
import Characters from "./../pages/characters";
import Episodes from "../pages/episodes";
import Location from "../pages/locations";
import CharacterProfile from "../pages/characterProfile";
import PageNotFound from "./../pages/404";
import Template from "./../components/template";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import logoBlack from "../assets/images/logo-black.png";
import Episode from "../pages/episode";
import Locations from "../pages/locations";

function Router() {
  const [menuShown, setMenuShown] = useState(false);

  return (
    <Template>
      <BrowserRouter>
        <header>
          <nav>
            <div id='header-bar'>
              <NavLink onClick={() => setMenuShown(false)} to='/'>
                <img id='header-logo' src={logoBlack} alt='' />
              </NavLink>
              <div
                onClick={() => setMenuShown(!menuShown)}
                className={`hamburger-lines ${menuShown && "menu-opened"}`}
              >
                <span className='line line1'></span>
                <span className='line line2'></span>
                <span className='line line3'></span>
              </div>
            </div>

            <ul className={`${menuShown && "menu-list-opened"}`}>
              <li>
                <NavLink onClick={() => setMenuShown(false)} to='characters'>
                  Characters
                </NavLink>
              </li>
              <li>
                <NavLink onClick={() => setMenuShown(false)} to='locations'>
                  Locations
                </NavLink>
              </li>
              <li>
                <NavLink onClick={() => setMenuShown(false)} to='episodes'>
                  Episodes
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path='/' element={<Characters />} />
            <Route path='characters' element={<Characters />} />

            <Route path='characters/:id' element={<CharacterProfile />} />
            <Route path='episodes' element={<Episodes />} />
            <Route path='episodes/:id' element={<Episode />} />
            <Route path='locations' element={<Locations />} />
            <Route path='locations/:id' element={<Location />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </Template>
  );
}

export default Router;
