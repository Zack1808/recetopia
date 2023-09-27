import { useState } from "react";

// Importing the costume components
import Button from "../Button/Button";
import Link from "../../components/Link/Link";
import Card from "../../components/Card/Card";

// Importing the style file
import "./Pagination.css";

// Creating the Pagination component
const Pagination = ({ items = [], itemsPerPage = 5 }) => {
  // Setting up the state
  const [currentPage, setCurrentPage] = useState(0);

  // Funciton that will render the pagination buttons
  const renderButtons = () => {
    let buttons = Array.from(
      Array(Math.ceil(items.length / itemsPerPage)).keys()
    );
    return buttons.map((number) => (
      <Button
        secondary={number !== currentPage}
        key={number}
        onClick={() => setCurrentPage(number)}
      >
        {number + 1}
      </Button>
    ));
  };

  return (
    <div className="pagination">
      {/* Displaying the items for the current page start */}
      <div className="item-display">
        {items
          .slice(
            currentPage * itemsPerPage,
            currentPage * itemsPerPage + itemsPerPage
          )
          .map((item) => (
            <Link className="link" to={`/recipe/${item.id}`} key={item.id}>
              <Card imageName={item.title}>
                <h2>{item.title}</h2>
                <small>
                  Created on: <span>{item.dateCreated}</span>
                </small>
              </Card>
            </Link>
          ))}
      </div>
      {/* Displaying the items for the current page end */}

      {/* Displaying the buttons start */}
      {itemsPerPage < items.length && (
        <div className="buttons">{renderButtons()}</div>
      )}
      {/* Displaying the buttons end */}
    </div>
  );
};

// Exporting the component
export default Pagination;
