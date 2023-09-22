// Creating the Link component
const Link = ({ children, to, onClick, ...rest }) => {
  // Function that will prevent the defualt behaviour of the anchor tag
  const handleClick = (e) => {
    // Will prevent default behavior only if the control key or command key is not pressed
    !e.ctrlKey && !e.metaKey && e.preventDefault();
    onClick && onClick();
  };

  return (
    <a {...rest} onClick={handleClick} href={to}>
      {children}
    </a>
  );
};

// Exporting the component
export default Link;
