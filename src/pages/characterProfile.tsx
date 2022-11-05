import { Character } from "../interface";
import { useState } from "react";
import { useEffect } from "react";
import { getCharacterProfile } from "../services/api";
import { useParams } from "react-router-dom";
import Style from "./characterProfile.module.scss";
import Arrow from "../assets/images/arrow_back.png";
const CharacterProfile = () => {
  let params: any = useParams() ?? 0;
  const [character, setCharacter] = useState<Character | null>(null);
  useEffect(() => {
    getCharacterProfile(params.id)
      .then((data: Character) => {
        setCharacter(data);
      })
      .finally(() => {});
  }, []);

  return (
    <>
      {character ? (
        <div className={Style.container}>
          <div className={Style.back}>
            <img src={Arrow} alt='' />
            <h3>GO BACK</h3>
          </div>
          <img className={Style.img} src={character.image} alt='' />
          <h1 className={Style.h1}>{character.name}</h1>
          <section className={Style.section} id='informations'>
            <h3>Informations</h3>
          </section>
          <section className={Style.section} id='episodes'>
            <h3>Episodes</h3>
          </section>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default CharacterProfile;
