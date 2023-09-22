// Creating the Hamburger component
const Hamburger = ({ toggle, onClick }) => {
  return (
    <div className={`hamburger ${toggle ? "active" : ""}`} onClick={onClick} />
  );
};

// Exporting the component
export default Hamburger;
