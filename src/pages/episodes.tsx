import { debounce, filter } from "lodash";
import { useEffect, useState } from "react";
import Logo from "../assets/images/episode-logo.png";
import Spinner from "../assets/images/spinner.gif";
import EpisodeCardList from "../components/episodeCardList";
import { getEpisode, getEpisodes } from "./../services/api";
interface EpisodeFilter {
  name: string;
  episode: string;
}
interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}
interface EpisodeResult {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: Episode[];
  error?: string;
}

function Episodes() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [episodeResult, setEpisodeResult] = useState<EpisodeResult>();
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<EpisodeFilter>({
    name: "",
    episode: "",
  });

  useEffect(() => {
    getProcessedLocations();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", debounceFunction);
    return function cleanup() {
      window.removeEventListener("scroll", debounceFunction);
    };
  }, [episodeResult]);

  useEffect(() => {
    if (filters.name) {
      getFilteresEpisodes();
    } else {
      getProcessedLocations();
    }
  }, [filters]);

  const handleScroll = () => {
    const bottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight;

    if (bottom) {
      window.removeEventListener("scroll", debounceFunction);
      setTimeout(() => {
        const currentPage = episodeResult?.info?.next?.split("page=")[1];
        getProcessedLocations(currentPage);
      }, 500);
    }
  };

  const getProcessedLocations = (currentPage = "") => {
    setLoading(true);
    getEpisodes({}, currentPage)
      .then((data: EpisodeResult) => {
        if (data.results) {
          setEpisodes(
            currentPage ? [...episodes, ...data.results] : data.results
          );
          setEpisodeResult(data);
        }
      })
      .finally(() => setLoading(false));
  };

  const getFilteresEpisodes = (currentPage = "") => {
    setLoading(true);
    Promise.all([
      getEpisodes({ name: filters.name }, currentPage),
      getEpisodes({ episode: filters.name }, currentPage),
    ])
      .then((data: EpisodeResult[]) => {
        console.log(
          [...(data[0]?.results || []), ...(data[1]?.results || [])].filter(
            (a, i, ar) => ar.findIndex(a2 => a2.id === a.id) === i
          )
        );
      })
      .finally(() => setLoading(false));
  };

  const debounceFunction = debounce(handleScroll, 1000);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim().replace(/\s+/g, "+");

    setFilters({
      name: value,
      episode: value,
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
          placeholder='Name or episode (ex.S01E01)...'
        />
      </div>
      <EpisodeCardList episodeList={episodes} />
      {loading ? <img id='spinner' src={Spinner} alt='' /> : null}
    </div>
  );
}

export default Episodes;
