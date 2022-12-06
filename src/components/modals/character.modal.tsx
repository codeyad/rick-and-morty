import { useState } from 'react'
import Modal from '../common/modal'

interface Selected {
  species: string
  gender: string
  status: string
  name?: string
}

interface Props {
  isShown: boolean
  onSubmit: (selected: Selected) => void
  onClose: () => void
}

const CharacterModal = ({ isShown, onSubmit, onClose }: Props) => {
  const selectValues = {
    species: [
      { value: '', id: 0 },
      { value: 'human', id: 1 },
      { value: 'alien', id: 2 }
    ],
    gender: [
      { value: '', id: 0 },
      { value: 'male', id: 1 },
      { value: 'female', id: 2 },
      { value: 'genderless', id: 3 },
      { value: 'unknown', id: 4 }
    ],
    status: [
      { value: '', id: 0 },
      { value: 'alive', id: 1 },
      { value: 'dead', id: 2 },
      { value: 'unknown', id: 3 }
    ]
  }
  const [selected, setSelected] = useState<Selected>({
    species: '',
    gender: '',
    status: ''
  })
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected({ ...selected, [e.target.name]: e.target.value })
  }

  return (
    <Modal
      isShown={isShown}
      onSubmit={() => onSubmit(selected)}
      onClose={onClose}
    >
      {' '}
      <select name='species' onChange={handleChange}>
        {' '}
        {selectValues.species?.map(s => (
          <option key={s.id} value={s.value}>
            {s.value || 'species'}
          </option>
        ))}
      </select>
      <select name='gender' onChange={handleChange}>
        {selectValues.gender?.map(g => (
          <option key={g.id} value={g.value}>
            {g.value || 'gender'}
          </option>
        ))}
      </select>
      <select name='status' onChange={handleChange}>
        {selectValues.status?.map(s => (
          <option key={s.id} value={s.value}>
            {s.value || 'status'}
          </option>
        ))}
      </select>
    </Modal>
  )
}

export default CharacterModal
