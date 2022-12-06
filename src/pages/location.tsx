import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CharacterCard from '../components/characterCard'
import { Character } from '../interface'
import { getCharacterProfile, getLocation } from './../services/api'
import styles from './location.module.scss'
interface Location {
  id: any
  name: string
  type: string
  dimension: string
  residents: string[]
  url: string
  created: string
}

const Location = () => {
  const params: any = useParams() ?? 0
  const [location, setLocation] = useState<Location | null>(null)
  const [characters, setCharacters] = useState<Character[] | []>([])
  useEffect(() => {
    getLocation(params.id)
      .then((data: Location) => {
        setLocation(data)
        const charactersId = data.residents.map(c => {
          const id = c.split('character/')[1]
          return id
        })
        // TODO: refactor to have the same behavior that
        // home page because of errors
        getCharacterProfile(charactersId).then(res => {
          setCharacters(res)
        })
      })
      .finally(() => {})
  }, [])
  return (
    <>
      <h1 className={styles.title}>{location?.name}</h1>
      <section className={styles.details}>
        <div>
          <h3>type</h3>
          <p>{location?.type}</p>
        </div>
        <div>
          <h3>Dimension</h3>
          <p>{location?.dimension}</p>
        </div>
      </section>
      <section className={styles.characters}>
        <h3>Cast</h3>
        <CharacterCard characters={characters} />
      </section>
    </>
  )
}

export default Location
