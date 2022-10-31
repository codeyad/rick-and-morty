import { useEffect, useState } from "react";
import Modal from "../components/common/modal";
import { getCharacter } from "../services/api";
import "./character.scss";

function Character() {
  const [openedModal, setOpenedModal] = useState(false);
  const [characters, setCharacters] = useState<any[]>([]);

  useEffect(() => {
    getCharacter({ species: "", gender: "", status: "" }).then(data => {
      setCharacters(data.results);
    });
  }, []);

  const handleModalSubmit = (data: any) => {
    setOpenedModal(false);
    getCharacter(data).then(data => setCharacters(data.results));
  };

  const handleOpenModal = () => setOpenedModal(true);

  const handleCloseModal = () => setOpenedModal(false);
  return (
    <>
      <div id='logo'></div>
      <div id='filters'>
        <input type='text' name='name' id='' placeholder='Filter by name...' />
        <div className='button' onClick={handleOpenModal}>
          <label htmlFor=''>ADVANCED FILTERS</label>
        </div>
      </div>
      {characters.map(c => (
        <div key={c.id} className='card'>
          <img src={c.image} alt='' />
          <h3>{c.name}</h3>
          <p>{c.species}</p>
        </div>
      ))}

      <Modal
        isShown={openedModal}
        onSubmit={handleModalSubmit}
        onClose={handleCloseModal}
      />
    </>
  );
}

export default Character;
