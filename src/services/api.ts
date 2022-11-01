import { Filters } from "../interface";

const BASE_URL = "https://rickandmortyapi.com/api";

export const getCharacter = (
  { species, gender, status, name }: Filters,
  page: string = ""
) => {
  console.log(species);
  return get(
    "character",
    `species=${species}&gender=${gender}&status=${status}&name=${name}`,
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
  try {
    const response = await fetch(
      `${BASE_URL}/${endpoint}/?page=${page}&${filters}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    debugger;
    return [];
  }
};
