import "./template.scss";

type Props = {
  children?: React.ReactNode;
};

function Template({ children }: Props) {
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
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer></footer>
    </>
  );
}

export default Template;
