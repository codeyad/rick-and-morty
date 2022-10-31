import { getCharacter } from "../services/api";
import Modal from "./common/modal";
import "./template.scss";
import { useState, useEffect } from "react";

type Props = {
  children?: React.ReactNode;
};

function Template({ children }: Props) {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>nav</li>
            <li>nav</li>
            <li>nav</li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
      <footer></footer>
    </>
  );
}

export default Template;
