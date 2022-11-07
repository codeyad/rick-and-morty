import { Filters } from "../interface";

const BASE_URL = "https://rickandmortyapi.com/api";
interface locationFilter {
  type: string;
  dimension: string;
  name?: string;
}

interface episodeFilter {
  nameOrEpisode?: string;
}

export const getCharacterProfile = (id: string) => {
  return get(`character/${id}`);
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

export const getLocation = (
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
  { nameOrEpisode }: episodeFilter,
  page: string = ""
) => {
  return get(
    "episode",
    `name=${nameOrEpisode || ""}&episode=${nameOrEpisode || ""}`,
    page
  );
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
