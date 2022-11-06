import { Character } from "../interface";
import { useState } from "react";
import { useEffect } from "react";
import { getCharacterProfile } from "../services/api";
import { useParams, Link } from "react-router-dom";
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
            <Link to='/characters'>
              <img src={Arrow} alt='' />
              <h3>GO BACK</h3>
            </Link>
          </div>
          <img className={Style.img} src={character.image} alt='' />
          <h1 className={Style.h1}>{character.name}</h1>
          <section className={Style.section} id='informations'>
            <h3>Informations</h3>
            <div className={Style.tab}>
              <h4>Title</h4>
              <p>description</p>
              <p>date...</p>
            </div>
            <div className={Style.tab}>
              <h4>Title</h4>
              <p>description</p>
              <p>date...</p>
            </div>
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
