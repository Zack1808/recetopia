// Creating the Link component
const Link = ({ children, to }) => {
  return <a href={to}>{children}</a>;
};

// Exporting the component
export default Link;
