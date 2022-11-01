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
  const [loading, setLoading] = useState(false);

  const [selected, setSelected] = useState({
    species: "",
    gender: "",
    status: "",
  });

  const selectValues = {
    species: [
      { value: "", id: 0 },
      { value: "human", id: 1 },
      { value: "alien", id: 2 },
    ],
    gender: [
      { value: "", id: 0 },
      { value: "male", id: 1 },
      { value: "female", id: 2 },
      { value: "genderless", id: 3 },
      { value: "unknown", id: 4 },
    ],
    status: [
      { value: "", id: 0 },
      { value: "alive", id: 1 },
      { value: "dead", id: 2 },
      { value: "unknown", id: 3 },
    ],
  };
  useEffect(() => {
    getCharacter({ species: "", gender: "", status: "" }).then(
      (data: CharacterResult) => {
        setCharacters(data.results);
        setCharacterResult(data);
      }
    );
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", debounceFunction);
    return function cleanup() {
      window.removeEventListener("scroll", debounceFunction);
    };
  }, [characterResult]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected({ ...selected, [e.target.name]: e.target.value });
  };

  const handleModalSubmit = () => {
    setOpenedModal(false);
    console.log(selected);
    getCharacter(selected).then((data: CharacterResult) => {
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
      window.removeEventListener("scroll", debounceFunction);
      const page = characterResult?.info.next?.split("page=")[1];

      if (!page) return;
      setLoading(true);
      setTimeout(() => {
        getCharacter({ species: "", gender: "", status: "" }, page)
          .then((data: CharacterResult) => {
            setCharacters([...characters, ...data.results]);
            setCharacterResult(data);
          })
          .catch(error => {
            console.log("ERROR:", error);
          })
          .finally(() => setLoading(false));
      }, 500);
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
      {loading ? <img id='spinner' src='img/spinner.gif' alt='' /> : null}
      <Modal
        isShown={openedModal}
        onSubmit={handleModalSubmit}
        onClose={handleCloseModal}
      >
        {" "}
        <select name='species' onChange={handleChange}>
          {" "}
          {selectValues.species?.map(s => (
            <option key={s.id} value={s.value}>
              {s.value || "species"}
            </option>
          ))}
        </select>
        <select name='gender' onChange={handleChange}>
          {selectValues.gender?.map(g => (
            <option key={g.id} value={g.value}>
              {g.value || "gender"}
            </option>
          ))}
        </select>
        <select name='status' onChange={handleChange}>
          {selectValues.status?.map(s => (
            <option key={s.id} value={s.value}>
              {s.value || "status"}
            </option>
          ))}
        </select>
      </Modal>
    </div>
  );
}

export default Character;
