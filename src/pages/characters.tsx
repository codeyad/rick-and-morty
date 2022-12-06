import { useEffect, useState } from 'react'
import { getCharacter } from '../services/api'
import './character.scss'
import { debounce } from 'lodash'
import CharacterModal from '../components/modals/character.modal'
import CharacterCard from '../components/characterCard'
import { Filters, Character } from '../interface/index'
import Spinner from '../assets/images/spinner.gif'
import Logo from '../assets/images/logo.png'
interface CharacterResult {
  info?: {
    count: number
    next: string
    pages: number
    prev: string
  }
  results?: Character[]
  error?: string
}

interface Selected {
  species: string
  gender: string
  status: string
  name?: string
}

const Characters = () => {
  const [openedModal, setOpenedModal] = useState(false)
  const [characters, setCharacters] = useState<Character[]>([])
  const [characterResult, setCharacterResult] = useState<CharacterResult>()
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState<Filters>({
    name: '',
    species: '',
    gender: '',
    status: ''
  })

  useEffect(() => {
    getProcessedCharacters()
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', debounceFunction)
    return function cleanup () {
      window.removeEventListener('scroll', debounceFunction)
    }
  }, [characterResult])

  useEffect(() => {
    getProcessedCharacters()
  }, [filters])

  const handleModalSubmit = (selected: Selected) => {
    setFilters({ ...filters, ...selected })
    setOpenedModal(false)
  }

  const handleOpenModal = () => setOpenedModal(true)

  const handleCloseModal = () => setOpenedModal(false)

  const handleScroll = () => {
    const bottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight

    if (bottom) {
      window.removeEventListener('scroll', debounceFunction)
      setTimeout(() => {
        const currentPage = characterResult?.info?.next?.split('page=')[1]
        getProcessedCharacters(currentPage)
      }, 500)
    }
  }

  const getProcessedCharacters = (currentPage = '') => {
    setLoading(true)
    getCharacter(filters, currentPage)
      .then((data: CharacterResult) => {
        if (data.results != null) {
          setCharacters(
            currentPage ? [...characters, ...data.results] : data.results
          )
          setCharacterResult(data)
        }
      })
      .finally(() => setLoading(false))
  }

  const debounceFunction = debounce(handleScroll, 1000)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      name: e.target.value.trim().replace(/\s+/g, '+')
    })
  }

  return (
    <div>
      <div id='logo' style={{ backgroundImage: `url(${Logo})` }}></div>
      <div id='filters'>
        <input
          type='text'
          onChange={debounce(handleInputChange, 1000)}
          name='name'
          id=''
          placeholder='Filter by name...'
        />
        <div className='button' onClick={handleOpenModal}>
          <label htmlFor=''>ADVANCED FILTERS</label>
        </div>
      </div>
      <CharacterCard characters={characters} />
      {loading ? <img id='spinner' src={Spinner} alt='' /> : null}
      <CharacterModal
        isShown={openedModal}
        onSubmit={handleModalSubmit}
        onClose={handleCloseModal}
      />
    </div>
  )
}

export default Characters
