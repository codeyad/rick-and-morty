import { getCharacter } from "../services/api";
import Modal from "./common/modal";
import "./template.scss";

type Props = {
  children?: React.ReactNode;
};

function Template({ children }: Props) {
  const handleModalSubmit = (data: any) => {
    getCharacter(data).then(data => console.log(data));
  };

  return (
    <>
      <header>
        <nav>
          <ul>
            <li>nav</li>
            <li>nav</li>
            <li>nav</li>
          </ul>
        </nav>
        <div id='logo'></div>
        <div id='filters'>
          <input
            type='text'
            name='name'
            id=''
            placeholder='Filter by name...'
          />
          <div>
            <label htmlFor=''>ADVANCED FILTERS</label>
            <Modal isShown={true} onSubmit={handleModalSubmit} />
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer></footer>
    </>
  );
}

export default Template;
