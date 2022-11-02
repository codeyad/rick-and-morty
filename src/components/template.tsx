import "./template.scss";
import { useState } from "react";
import { NavLink } from "react-router-dom";

type Props = {
  children?: React.ReactNode;
};

function Template({ children }: Props) {
  const [menuShown, setMenuShown] = useState(true);

  return (
    <>
      {children}
      <footer></footer>
    </>
  );
}

export default Template;
