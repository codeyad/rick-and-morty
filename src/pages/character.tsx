import { useEffect, useState } from "react";
import Modal from "../components/common/modal";
import { getCharacter } from "../services/api";
import "./character.scss";
import { debounce } from "lodash";
interface CharacterResult {
  info: {
    count: number;
    next: string;
    pages: number;
    prev: string;
  };
  results: Character[];
}

interface Character {
  created: string;
  episode: string[];
  gender: string;
  id: number;
  image: string;
  location: {
    name: string;
    url: string;
  };
  name: string;
  origin: {
    name: string;
    url: string;
  };
  species: string;
  status: string;
  type: string;
  url: string;
}

function Character() {
  const [openedModal, setOpenedModal] = useState(false);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [characterResult, setCharacterResult] = useState<CharacterResult>();

  useEffect(() => {
    getCharacter({ species: "", gender: "", status: "" }).then(
      (data: CharacterResult) => {
        setCharacters(data.results);
        setCharacterResult(data);
      }
    );
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", debounce(debounceFunction, 1000));
    return function cleanup() {
      window.removeEventListener("scroll", debounceFunction);
    };
  }, [characterResult]);

  const handleModalSubmit = (data: any) => {
    setOpenedModal(false);
    getCharacter(data).then((data: CharacterResult) => {
      setCharacters(data.results);
      setCharacterResult(data);
    });
  };

  const handleOpenModal = () => setOpenedModal(true);

  const handleCloseModal = () => setOpenedModal(false);

  const handleScroll = () => {
    const bottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight;

    if (bottom) {
      const page = characterResult?.info.next?.split("page=")[1];
      if (!page) return;
      getCharacter({ species: "", gender: "", status: "" }, page)
        .then((data: CharacterResult) => {
          setCharacters([...characters, ...data.results]);
          setCharacterResult(data);
        })
        .catch(error => {
          console.log("ERROR:", error);
        });
    }
  };

  const debounceFunction = debounce(handleScroll, 1000);

  return (
    <div>
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
    </div>
  );
}

export default Character;
