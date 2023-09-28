import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

// Importing the costume components
import Form from "../Form/Form";
import Button from "../Button/Button";

// Importing the style file
import "./FilterTags.css";

// Creating the FilterTags component
const FilterTags = ({ items, selected, select, remove, onSubmit }) => {
  // Setting up the state
  const [tags, setTags] = useState([]);

  // Creating the tags list
  useEffect(() => {
    createTagList();

    // eslint-disable-next-line
  }, []);

  // Function that will add all tags into a list
  const createTagList = () => {
    if (items.length <= 0) return;
    items.map((item) => {
      item.tags.map((tag) => {
        if (!tags.includes(tag)) setTags((prevState) => [...prevState, tag]);
        return tag;
      });
      return item;
    });

    // Removing duplicates
    setTags((prevState) =>
      prevState.filter((item, index, arr) => arr.indexOf(item) === index)
    );
  };

  return (
    <Form onSubmit={onSubmit}>
      {/* Displaying the selected tags start */}
      <div className="selected">
        <h4>Selected tags</h4>
        <div className="tags-list">
          {selected.length > 0 ? (
            selected.map((tag) => (
              <span key={`${tag}-selected`}>
                {tag} <FaTimes onClick={() => remove(tag)} />
              </span>
            ))
          ) : (
            <p>No tags selected</p>
          )}
        </div>
      </div>
      {/* Displaying the selected tags end */}

      {/* Displaying all tags start */}
      <div className="tags">
        <h4>All available tags</h4>
        <div className="tags-list">
          {tags.length > 0 ? (
            tags.map(
              (tag) =>
                !selected.includes(tag) && (
                  <span onClick={() => select(tag)} key={`${tag}-all`}>
                    {tag}
                  </span>
                )
            )
          ) : (
            <p>No Tags available</p>
          )}
        </div>
      </div>
      {/* Displaying all tags end */}

      <Button>Filter</Button>
    </Form>
  );
};

// Exporting the component
export default FilterTags;
