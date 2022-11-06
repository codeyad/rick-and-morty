import { Character } from "../interface";
import { useState } from "react";
import { useEffect } from "react";
import { getCharacterProfile } from "../services/api";
import { useParams, Link } from "react-router-dom";
import Style from "./characterProfile.module.scss";
import Arrow from "../assets/images/arrow_back.png";
import { getEpisode } from "./../services/api";
import TabList from "./../components/tabList";
import moment from "moment";

interface Episode {
  air_date: string;
  Characters: string[];
  created: string;
  episode: string;
  id: number;
  name: string;
  url: string;
}

const CharacterProfile = () => {
  let params: any = useParams() ?? 0;
  const [character, setCharacter] = useState<Character | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [informationList, setInformationList] = useState<any>([]);
  useEffect(() => {
    getCharacterProfile(params.id)
      .then((data: Character) => {
        setCharacter(data);
      })
      .finally(() => {});
  }, []);

  useEffect(() => {
    setInformationList([
      {
        id: 0,
        title: "Gender",
        description: character?.gender,
      },
      {
        id: 1,
        title: "Status",
        description: character?.status,
      },
      {
        id: 2,
        title: "Specie",
        description: character?.species,
      },
      {
        id: 3,
        title: "Origin",
        description: character?.origin.name,
      },
      {
        id: 4,
        title: "Type",
        description: character?.type || "unknown",
      },
      {
        id: 5,
        title: "Location",
        description: character?.location.name,
        link: `/locations/${character?.location.url.split("location/")[1]}`,
      },
    ]);
    const episodes: any = character?.episode.map(e =>
      getEpisode(e.split("episode/")[1])
    );

    episodes &&
      Promise.all(episodes).then(response => {
        setEpisodes(response);
      });
  }, [character]);

  return (
    <>
      {character ? (
        <div className={Style.container}>
          <div className={Style.back}>
            <Link to='/characters'>
              <img src={Arrow} alt='' />
              <h3>GO BACK</h3>
            </Link>
          </div>
          <img className={Style.img} src={character.image} alt='' />
          <h1 className={Style.h1}>{character.name}</h1>
          <section className={Style.section} id='informations'>
            <h3>Informations</h3>
            <TabList list={informationList}></TabList>
          </section>
          <section className={Style.section} id='episodes'>
            <h3>Episodes</h3>
            <TabList
              list={episodes.map(e => ({
                id: e.id,
                title: e.episode,
                description: e.name,
                link: `/episodes/${e.id}`,
                date: moment(e.created).utc().format("MMMM DD, YYYY"),
              }))}
            />
          </section>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default CharacterProfile;
