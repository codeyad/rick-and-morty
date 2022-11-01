import { filters } from "../interface";

const BASE_URL = "https://rickandmortyapi.com/api";

export const getCharacter = (
  { species, gender, status }: filters,
  page: string = ""
) => {
  return get(
    "character",
    `?species=${species}&gender=${gender}&status=${status}`,
    page
  );
};

export const getLocation = () => {
  return get("location");
};

export const getEpisode = () => {
  return get("episode");
};

const get = async (endpoint: string, filters?: string, page: string = "") => {
  const response = await fetch(
    `${BASE_URL}/${endpoint}/?page=${page}&${filters}`
  );
  const data = await response.json();
  return data;
};
