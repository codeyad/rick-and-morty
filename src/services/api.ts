import { Filters } from "../interface";

const BASE_URL = "https://rickandmortyapi.com/api";
interface locationFilter {
  type: string;
  dimension: string;
  name?: string;
}

interface episodeFilter {
  name?: string;
  episode?: string;
}

export const getCharacterProfile = (id: string | string[]) => {
  return get(`character/${id}`);
};

export const getLocation = (id: string) => {
  return get(`location/${id}`);
};

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

export const getLocations = (
  { type, dimension, name }: locationFilter,
  page: string = ""
) => {
  return get(
    "location",
    `type=${type}&dimension=${dimension}&name=${name || ""}`,
    page
  );
};

export const getEpisodes = (
  { name, episode }: episodeFilter,
  page: string = ""
) => {
  return get("episode", `name=${name || ""}&episode=${episode || ""}`, page);
};

export const getEpisode = (id: string) => {
  return get(`episode/${id}`);
};

const get = async (endpoint: string, filters?: string, page: string = "") => {
  try {
    const response = await fetch(
      `${BASE_URL}/${endpoint}/?${filters ? filters + "&" : ""}page=${page}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return [];
  }
};
