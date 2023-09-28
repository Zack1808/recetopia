import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

// Importing the context hook
import { useNavigate } from "../../context/navigation";

// Importing the actions
import { getRecipesDispatcher } from "../../actions/recipesActions";

// Importing the api funciton
import { fetchAllRecipes } from "../../api/fetchRecipes";

// Importing the costume components
import SearchBar from "../../components/SearchBar/SearchBar";
import Loader from "../../components/Loader/Loader";
import Button from "../../components/Button/Button";
import Pagination from "../../components/Pagination/Pagination";
import Modal from "../../components/Modal/Modal";
import FilterTags from "../../components/FilterTags/FilterTags";

// Importing the style file
import "./Dashboard.css";

// Creating the Dashboard component
const Dashboard = () => {
  // Getting the state from the store
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const recipes = useSelector((state) => state.recipes.recipes);

  // Setting ut the state
  const [found, setFound] = useState(recipes); // Will contain the list of found recipes with the particular title
  const [selectedTags, setSelectedTags] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // State that will define if the filter modal is open or not

  // Setting up the ref
  const headerRef = useRef();
  const searchRef = useRef();

  // Getting the navigate function
  const { navigate } = useNavigate();

  // Setting up the disptach function
  const dispatch = useDispatch();

  // Rerouting the user to login if he is not logged in
  useEffect(() => {
    if (!isLoggedIn) navigate("/");
    else {
      getRecipes();
    }

    // eslint-disable-next-line
  }, []);

  // Setting the recipes in the found state since no search has been conducted
  useEffect(() => {
    setFound(recipes);
  }, [recipes]);

  // Function that will fetch all recipes
  const getRecipes = async () => {
    try {
      let data = await fetchAllRecipes();
      dispatch(getRecipesDispatcher(data.recipes));
    } catch (err) {
      console.log(err);
    }
  };

  // Funciton that will display the recipe with the searched name
  const handleSearch = () => {
    const term = searchRef.current.search.value;

    // Will set the state to contain all recipes if neither a tag or a search term has been given
    if (term.split(" ").join("") === "" && selectedTags.length === 0)
      setFound(recipes);
    // Will return all recipes that contain the selected tags and contain the searched term in the title
    else if (selectedTags.length !== 0 && term.split(" ").join("") !== "") {
      const items = recipes.filter((recipe) =>
        recipe.tags.some((tag) => selectedTags.includes(tag))
      );
      setFound(
        items.filter((item) =>
          item.title.toLowerCase().includes(term.toLowerCase())
        )
      );
    }

    // Will return all recipes which containt the search term in the title
    else if (selectedTags.length === 0 && term.split(" ").join("") !== "") {
      setFound(
        recipes.filter((recipe) =>
          recipe.title.toLowerCase().includes(term.toLowerCase())
        )
      );
    }

    // Will return all items with the selected tag
    else {
      setFound(
        recipes.filter((recipe) =>
          recipe.tags.some((tag) => selectedTags.includes(tag))
        )
      );
    }
  };

  // Function that will open the Filter Modal
  const toggleFilterModal = (value) => {
    setIsFilterOpen(value);
  };

  // Function that will add a tag to the selected tag list
  const addTag = (tag) => {
    setSelectedTags((prevState) => [...prevState, tag]);
  };

  // Function that will remove the tag from the selected tag list
  const removeTag = (tag) => {
    setSelectedTags((prevState) => prevState.filter((t) => t !== tag));
  };

  return (
    <div className="dashboard">
      <div className="container">
        {/* Header of the dashboard page start */}
        <div
          className="header"
          ref={headerRef}
          style={{ top: `${headerRef.current?.getBoundingClientRect().y}px` }}
        >
          <SearchBar onChange={handleSearch} ref={searchRef} />
          <div className="buttons">
            <Button secondary onClick={() => toggleFilterModal(true)}>
              Filter
            </Button>
            <Button>New</Button>
          </div>
        </div>
        {/* Header of the dashboard page end */}

        {/* Loading and displaying the recipes start */}
        {recipes.length === 0 ? (
          <div className="load">
            <Loader dark />
          </div>
        ) : (
          <Pagination items={found} itemsPerPage={10} />
        )}
        {/* Loading and displaying the recipes end */}

        {/* Show filter modal start */}
        {isFilterOpen && (
          <Modal title="Select Tags" close={() => toggleFilterModal(false)}>
            <FilterTags
              items={recipes}
              selected={selectedTags}
              select={addTag}
              remove={removeTag}
              onSubmit={handleSearch}
            />
          </Modal>
        )}
        {/* Show filter modal end */}
      </div>
    </div>
  );
};

// Exporting the component
export default Dashboard;
