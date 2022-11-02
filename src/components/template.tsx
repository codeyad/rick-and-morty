import "./template.scss";

type Props = {
  children?: React.ReactNode;
};

function Template({ children }: Props) {
  return (
    <>
      {children}
      <footer></footer>
    </>
  );
}

export default Template;
