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

interface Props {
  characters: Character[];
}

const CharacterCard = ({ characters }: Props) => {
  return (
    <>
      {characters.length ? (
        characters.map(c => (
          <div key={c.id} className='card'>
            <img src={c.image} alt='' />
            <h3>{c.name}</h3>
            <p>{c.species}</p>
          </div>
        ))
      ) : (
        <div className='card'>
          <img src='/img/404.jpg' alt='' />
          <h3>404</h3>
          <p>No data found here</p>
        </div>
      )}
    </>
  );
};

export default CharacterCard;
