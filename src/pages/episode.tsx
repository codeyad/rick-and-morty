import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getEpisode } from "./../services/api";
import styles from "./episode.module.scss";
interface Episode {
  air_date: string;
  Characters: string[];
  created: string;
  episode: string;
  id: number;
  name: string;
  url: string;
}

const Episode = () => {
  let params: any = useParams() ?? 0;
  const [episode, setEpisode] = useState<Episode | null>(null);
  useEffect(() => {
    getEpisode(params.id)
      .then((data: Episode) => {
        setEpisode(data);
        console.log(data);
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
    </>
  );
};

export default Episode;
