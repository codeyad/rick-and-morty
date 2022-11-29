import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import CharacterCard from "../components/characterCard";
import { Character } from "../interface";
import { getCharacterProfile, getEpisode } from "./../services/api";
import styles from "./episode.module.scss";
interface Episode {
  air_date: string;
  characters: string[];
  created: string;
  episode: string;
  id: number;
  name: string;
  url: string;
}

const Episode = () => {
  let params: any = useParams() ?? 0;
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [characters, setCharacters] = useState<Character[] | []>([]);
  useEffect(() => {
    getEpisode(params.id)
      .then((data: Episode) => {
        setEpisode(data);
        const charactersPromise = data.characters.map(c => {
          const id = c.split("character/")[1];
          return getCharacterProfile(id);
        });

        Promise.all(charactersPromise).then(res => {
          setCharacters(res);
        });
      })
      .finally(() => {});
  }, []);
  return (
    <>
      <h1 className={styles.title}>{episode?.name}</h1>
      <section className={styles.details}>
        <div>
          <h3>Episode</h3>
          <p>{episode?.episode}</p>
        </div>
        <div>
          <h3>Date</h3>
          <p>{episode?.air_date}</p>
        </div>
      </section>
      <section className={styles.characters}>
        <h3>Cast</h3>
        <CharacterCard characters={characters} />
      </section>
    </>
  );
};

export default Episode;
