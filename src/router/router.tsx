import { BrowserRouter, Routes, Route } from "react-router-dom";
import Characters from "./../pages/characters";
import Episode from "./../pages/episode";
import Location from "../pages/location";
import CharacterProfile from "../pages/characterProfile";
import PageNotFound from "./../pages/404";
import Template from "./../components/template";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import logoBlack from "../assets/images/logo-black.png";

function Router() {
  const [menuShown, setMenuShown] = useState(false);

  return (
    <Template>
      <BrowserRouter>
        <header>
          <nav>
            <div id='header-bar'>
              <NavLink onClick={() => setMenuShown(false)} to='characters'>
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
            <Route path='episodes' element={<Episode />} />
            <Route path='locations' element={<Location />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </Template>
  );
}

export default Router;
