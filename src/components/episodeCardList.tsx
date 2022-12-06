import Card from './card'

interface Episode {
  id: number
  name: string
  air_date: string
  episode: string
  characters: string[]
  url: string
  created: string
}

interface Props {
  episodeList: Episode[]
}

const EpisodeCardList = ({ episodeList }: Props) => {
  return (
    <>
      {episodeList.map(e => {
        const link = `/episodes/${e.id}`
        return (
          <Card key={e.id} title={e.name} detail={e.air_date} link={link} />
        )
      })}
    </>
  )
}

export default EpisodeCardList
