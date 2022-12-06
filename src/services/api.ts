import { Filters } from '../interface'

const BASE_URL = 'https://rickandmortyapi.com/api'
interface locationFilter {
  type: string
  dimension: string
  name?: string
}

interface episodeFilter {
  name?: string
  episode?: string
}

export const getCharacterProfile = async (
  id: string | string[]
): Promise<any> => {
  return await get(`character/${id}`)
}

export const getLocation = async (id: string): Promise<any> => {
  return await get(`location/${id}`)
}

export const getCharacter = async (
  { species, gender, status, name }: Filters,
  page: string = ''
): Promise<any> => {
  console.log(species)
  return await get(
    'character',
    `species=${species}&gender=${gender}&status=${status}&name=${name}`,
    page
  )
}

export const getLocations = async (
  { type, dimension, name }: locationFilter,
  page: string = ''
): Promise<any> => {
  return await get(
    'location',
    `type=${type}&dimension=${dimension}&name=${name || ''}`,
    page
  )
}

export const getEpisodes = async (
  { name, episode }: episodeFilter,
  page: string = ''
): Promise<any> => {
  return await get(
    'episode',
    `name=${name || ''}&episode=${episode || ''}`,
    page
  )
}

export const getEpisode = async (id: string): Promise<any> => {
  return await get(`episode/${id}`)
}

const get = async (endpoint: string, filters?: string, page: string = '') => {
  try {
    const response = await fetch(
      `${BASE_URL}/${endpoint}/?${filters ? filters + '&' : ''}page=${page}`
    )
    const data = await response.json()
    return data
  } catch (error) {
    return []
  }
}
