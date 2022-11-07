import Card from "./card";

interface Location {
  id: any;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

interface Props {
  locationList: Location[];
}

const LocationCardList = ({ locationList }: Props) => {
  return (
    <>
      {locationList.map(l => {
        const link = `/locations/${l.id}`;
        return <Card key={l.id} title={l.name} detail={l.type} link={link} />;
      })}
    </>
  );
};

export default LocationCardList;
