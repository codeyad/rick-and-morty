import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { getLocation } from "./../services/api";
import Logo from "../assets/images/location-logo.png";
import Spinner from "../assets/images/spinner.gif";
import Style from "./locations.module.scss";
import { Link } from "react-router-dom";

interface locationFilter {
  type: string;
  dimension: string;
  name?: string;
}

interface Location {
  id: any;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

interface LocationReult {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: Location[];
  error?: string;
}

function Locations() {
  const [openedModal, setOpenedModal] = useState(false);
  const [locations, setlocations] = useState<Location[]>([]);
  const [locationResult, setlocationResult] = useState<LocationReult>();
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<locationFilter>({
    type: "",
    dimension: "",
  });

  useEffect(() => {
    getProcessedLocations();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", debounceFunction);
    return function cleanup() {
      window.removeEventListener("scroll", debounceFunction);
    };
  }, [locationResult]);

  useEffect(() => {
    getProcessedLocations();
  }, [filters]);

  const handleModalSubmit = (selected: Location) => {
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
      setTimeout(() => {
        const currentPage = locationResult?.info?.next?.split("page=")[1];
        getProcessedLocations(currentPage);
      }, 500);
    }
  };

  const getProcessedLocations = (currentPage = "") => {
    setLoading(true);
    getLocation(filters, currentPage)
      .then((data: LocationReult) => {
        if (data.results) {
          setlocations(
            currentPage ? [...locations, ...data.results] : data.results
          );
          setlocationResult(data);
        }
      })
      .finally(() => setLoading(false));
  };

  const debounceFunction = debounce(handleScroll, 1000);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      dimension: e.target.value.trim().replace(/\s+/g, "+"),
    });
  };

  return (
    <div>
      <div id='logo' style={{ backgroundImage: `url(${Logo})` }}></div>
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
      {locations.map(l => (
        <div key={l.id} className={Style.list}>
          <Link to={`/locations/${l.id}`}>
            <h3>{l.name}</h3>
            <p>{l.type}</p>
          </Link>
        </div>
      ))}
      {loading ? <img id='spinner' src={Spinner} alt='' /> : null}
      {/* <CharacterModal
          isShown={openedModal}
          onSubmit={handleModalSubmit}
          onClose={handleCloseModal}
        /> */}
    </div>
  );
}

export default Locations;
