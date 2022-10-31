import { getCharacter } from "../services/api";
import Modal from "./common/modal";
import "./template.scss";
import { useState, useEffect } from "react";

type Props = {
  children?: React.ReactNode;
};

function Template({ children }: Props) {
  const [openedModal, setOpenedModal] = useState(false);

  const handleModalSubmit = (data: any) => {
    setOpenedModal(false);
    getCharacter(data).then(data => console.log(data));
  };

  const handleOpenModal = () => setOpenedModal(true);

  const handleCloseModal = () => setOpenedModal(false);
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
        <div id='logo'></div>
        <div id='filters'>
          <input
            type='text'
            name='name'
            id=''
            placeholder='Filter by name...'
          />
          <div className='button' onClick={handleOpenModal}>
            <label htmlFor=''>ADVANCED FILTERS</label>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer></footer>
      <Modal
        isShown={openedModal}
        onSubmit={handleModalSubmit}
        onClose={handleCloseModal}
      />
    </>
  );
}

export default Template;
