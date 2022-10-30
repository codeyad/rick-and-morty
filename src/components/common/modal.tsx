import { useState } from "react";

interface Props {
  children?: React.ReactNode;
  response?: (params: any) => any;
  isShown: boolean;
  onSubmit?: (data: any) => void;
}

function Modal({ children, response, isShown, onSubmit }: Props) {
  const selectValues = {
    species: [
      { value: "", id: 0 },
      { value: "human", id: 1 },
      { value: "alien", id: 2 },
    ],
    gender: [
      { value: "", id: 0 },
      { value: "male", id: 1 },
      { value: "female", id: 2 },
      { value: "genderless", id: 3 },
      { value: "unknown", id: 4 },
    ],
    status: [
      { value: "", id: 0 },
      { value: "alive", id: 1 },
      { value: "dead", id: 2 },
      { value: "unknown", id: 3 },
    ],
  };

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
    <div
      style={{
        position: "fixed",
        zIndex: 1,
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        overflow: "auto",
        backgroundColor: "rgba(0,0,0,0.4)",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <select name='species' onChange={handleChange}>
          {" "}
          {selectValues.species?.map(s => (
            <option key={s.id} value={s.value}>
              {s.value || "species"}
            </option>
          ))}
        </select>
        <select name='gender' onChange={handleChange}>
          {selectValues.gender?.map(g => (
            <option key={g.id} value={g.value}>
              {g.value || "gender"}
            </option>
          ))}
        </select>
        <select name='status' onChange={handleChange}>
          {selectValues.status?.map(s => (
            <option key={s.id} value={s.value}>
              {s.value || "status"}
            </option>
          ))}
        </select>

        <button type='submit'>APPLY</button>
      </form>
    </div>
  );
}

export default Modal;
