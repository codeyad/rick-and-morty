import { filters } from "../interface";

const BASE_URL = "https://rickandmortyapi.com/api";

export const getCharacter = ({ species, gender, status }: filters) => {
  return get(
    "character",
    `?species=${species}&gender=${gender}&status=${status}`
  );
};

export const getLocation = () => {
  return get("location");
};

export const getEpisode = () => {
  return get("episode");
};

const get = async (endpoint: string, filters?: string) => {
  const response = await fetch(`${BASE_URL}/${endpoint}/${filters}`);
  const data = await response.json();
  return data;
};
