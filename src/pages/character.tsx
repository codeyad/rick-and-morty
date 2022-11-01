import { useEffect, useState } from "react";
import Modal from "../components/common/modal";
import { getCharacter } from "../services/api";
import "./character.scss";
import { debounce } from "lodash";
import CharacterModal from "./../components/modals/character.modal";
import CharacterCard from "../components/characterCard";
import { Filters } from "./../interface/index";
interface CharacterResult {
  info?: {
    count: number;
    next: string;
    pages: number;
    prev: string;
  };
  results?: Character[];
  error?: string;
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

interface Selected {
  species: string;
  gender: string;
  status: string;
  name?: string;
}

function Character() {
  const [openedModal, setOpenedModal] = useState(false);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [characterResult, setCharacterResult] = useState<CharacterResult>();
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    name: "",
    species: "",
    gender: "",
    status: "",
  });

  useEffect(() => {
    getCharacter(filters).then((data: CharacterResult) => {
      setCharacters(data.results || []);
      setCharacterResult(data);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", debounceFunction);
    return function cleanup() {
      window.removeEventListener("scroll", debounceFunction);
    };
  }, [characterResult]);

  useEffect(() => {
    getCharacter(filters)
      .then((data: CharacterResult) => {
        setCharacters(data.results || []);
        setCharacterResult(data);
      })
      .catch(error => {
        console.log("ERROR:", error);
      })
      .finally(() => setLoading(false));
  }, [filters]);

  const handleModalSubmit = (selected: Selected) => {
    setFilters({ ...filters, ...selected });
    setOpenedModal(false);
  };

  const handleOpenModal = () => setOpenedModal(true);

  const handleCloseModal = () => setOpenedModal(false);

  const handleScroll = () => {
    const bottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight;

    if (bottom) {
      window.removeEventListener("scroll", debounceFunction);
      const page = characterResult?.info?.next?.split("page=")[1];

      if (!page) return;
      setLoading(true);
      setTimeout(() => {
        getCharacter(filters, page)
          .then((data: CharacterResult) => {
            if (data.results) {
              setCharacters([...characters, ...data.results]);
              setCharacterResult(data);
            }
          })
          .finally(() => setLoading(false));
      }, 500);
    }
  };

  const debounceFunction = debounce(handleScroll, 1000);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      name: e.target.value.trim().replace(/\s+/g, "+"),
    });
  };

  return (
    <div>
      <div id='logo'></div>
      <div id='filters'>
        <input
          type='text'
          onChange={debounce(handleInputChange, 1000)}
          name='name'
          id=''
          placeholder='Filter by name...'
        />
        <div className='button' onClick={handleOpenModal}>
          <label htmlFor=''>ADVANCED FILTERS</label>
        </div>
      </div>
      <CharacterCard characters={characters} />
      {loading ? <img id='spinner' src='img/spinner.gif' alt='' /> : null}
      <CharacterModal
        isShown={openedModal}
        onSubmit={handleModalSubmit}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default Character;
