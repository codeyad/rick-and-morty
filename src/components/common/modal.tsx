import { useState } from "react";

interface Props {
  children?: React.ReactNode;
  isShown: boolean;
  onSubmit?: (data: any) => void;
  onClose?: () => void;
}

function Modal({ children, isShown, onSubmit, onClose }: Props) {
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
    species: "",
    gender: "",
    status: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit && onSubmit(selected);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected({ ...selected, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    onClose && onClose();
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
        backgroundColor: "rgba(0,0,0,0.6)",
      }}
    >
      <main
        style={{
          display: "flex",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "19rem",
            height: "21rem",
            backgroundColor: "white",
            borderRadius: 10,
          }}
        >
          <div
            style={{
              position: "relative",
              width: "90%",
              margin: "0.4rem 1rem",
            }}
          >
            <h3 style={{ display: "inline-block" }}>Filters</h3>
            <i
              style={{
                float: "right",
                fontStyle: "normal",
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#b6b6b6",
              }}
              onClick={handleClose}
            >
              x
            </i>
          </div>
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
      </main>
    </div>
  );
}

export default Modal;
