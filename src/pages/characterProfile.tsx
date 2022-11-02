import { Character } from "../interface";
import { useState } from "react";
import { useEffect } from "react";
import { getCharacterProfile } from "../services/api";
import { useParams } from "react-router-dom";

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
        <div>
          <img src={character.image} alt='' />
          <h1>{character.name}</h1>
          <section id='informations'>
            <h3>Informations</h3>
          </section>
          <section id='episodes'>
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
