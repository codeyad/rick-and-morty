import { useState } from "react";

interface Props {
  children?: React.ReactNode;
  response?: (params: any) => any;
  isShown: boolean;
  onSubmit?: (data: any) => void;
}

type State = {
  species: { value: string; id: number }[] | null;
  gender: { value: string; id: number }[] | null;
  status: { value: string; id: number }[] | null;
};

function Modal({ children, response, isShown, onSubmit }: Props) {
  const [state] = useState<State>({
    species: [
      { value: "human", id: 1 },
      { value: "alien", id: 2 },
    ],
    gender: [
      { value: "male", id: 1 },
      { value: "female", id: 2 },
      { value: "genderless", id: 3 },
      { value: "unknown", id: 4 },
    ],
    status: [
      { value: "alive", id: 1 },
      { value: "dead", id: 2 },
      { value: "unknown", id: 3 },
    ],
  });

  const [selected, setSelected] = useState({
    species: "human",
    gender: "male",
    status: "alive",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit && onSubmit(selected);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected({ ...selected, [e.target.name]: e.target.value });
  };

  if (!isShown) return null;

  return (
    <form onSubmit={handleSubmit}>
      <select name='species' onChange={handleChange}>
        {" "}
        {state.species?.map(s => (
          <option key={s.id} value={s.value}>
            {s.value}
          </option>
        ))}
      </select>
      <select name='gender' onChange={handleChange}>
        {state.gender?.map(g => (
          <option key={g.id} value={g.value}>
            {g.value}
          </option>
        ))}
      </select>
      <select name='status' onChange={handleChange}>
        {state.status?.map(s => (
          <option key={s.id} value={s.value}>
            {s.value}
          </option>
        ))}
      </select>

      <button type='submit'>APPLY</button>
    </form>
  );
}

export default Modal;
