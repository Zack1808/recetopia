import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

// Importing the context hook
import { useNavigate } from "../../context/navigation";

// Importing the actions
import {
  getRecipesDispatcher,
  clearRecipesDispatcher,
} from "../../actions/recipesActions";

// Importing the api funciton
import { fetchAllRecipes, addRecipe } from "../../api/fetchRecipes";

// importing the helper function
import { search } from "../../helpers/recipeSearch";

// Importing the costume components
import SearchBar from "../../components/SearchBar/SearchBar";
import Loader from "../../components/Loader/Loader";
import Button from "../../components/Button/Button";
import Pagination from "../../components/Pagination/Pagination";
import Modal from "../../components/Modal/Modal";
import FilterTags from "../../components/FilterTags/FilterTags";
import RecipeInfoForm from "../../components/RecipeInfoForm/RecipeInfoForm";

// Importing the style file
import "./Dashboard.css";

// Creating the Dashboard component
const Dashboard = () => {
  // Getting the state from the store
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userId = useSelector((state) => state.user.user);
  const rec = useSelector((state) => state.recipes.recipes);

  // Setting ut the state
  const [recipes, setRecipes] = useState([]);
  const [found, setFound] = useState(recipes); // Will contain the list of found recipes with the particular title
  const [selectedTags, setSelectedTags] = useState([]); // Will contain all selected tags
  const [isFilterOpen, setIsFilterOpen] = useState(false); // State that will define if the filter modal is open or not
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false); // State that will define if the modal for a new recipe creating is open or not
  const [isLoading, setIsLoading] = useState(true); // Will check if the status is loading or not

  // Setting up the ref
  const headerRef = useRef();
  const searchRef = useRef();

  // Getting the navigate function
  const { navigate, currentPath } = useNavigate();

  // Setting up the disptach function
  const dispatch = useDispatch();

  // Rerouting the user to login if he is not logged in
  useEffect(() => {
    const id = Cookies.get("persistentLogin");
    if (!!!id && !isLoggedIn) navigate("/");
    else {
      getRecipes();
      if (currentPath === "/my-recipes")
        setRecipes((prevState) =>
          prevState.filter((rec) => rec.authorId === userId.id)
        );
    }

    // eslint-disable-next-line
  }, []);

  // Will update the recipe list depending on if the user wants to see all recipes or only his own
  useEffect(() => {
    if (currentPath === "/my-recipes")
      setRecipes(rec.filter((r) => r.authorId === userId.id));
    else setRecipes(rec);

    // eslint-disable-next-line
  }, [rec]);

  // Function that will fetch all recipes
  const getRecipes = async () => {
    try {
      let data = await fetchAllRecipes();
      dispatch(getRecipesDispatcher(data.recipes));
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  // Function that will add a recipe to the database
  const addNewRecipe = async (body) => {
    body.recipe.authorId = userId.id;
    try {
      setIsLoading(true);
      setIsRecipeModalOpen(false);
      const data = await addRecipe(body);
      dispatch(clearRecipesDispatcher());
      toast.success(data.message + ". Please refresh to show the recipes", {
        position: "top-center",
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      getRecipes();
    } catch (err) {
      console.log(err);
    }
  };

  // Funciton that will display the recipe with the searched name
  const handleSearch = () => {
    const term = searchRef.current.search.value;
    setFound(search(term, selectedTags, recipes));
    setIsFilterOpen(false);
  };

  // Function that will close
  const closeFilterModal = () => {
    setIsFilterOpen(false);
    handleSearch();
  };

  // Function that will add a tag to the selected tag list
  const addTag = (tag) => {
    setSelectedTags((prevState) => [...prevState, tag]);
  };

  // Function that will remove the tag from the selected tag list
  const removeTag = (tag) => {
    setSelectedTags((prevState) => prevState.filter((t) => t !== tag));
  };

  // Function that will remove all tags
  const removeAllTags = () => {
    setSelectedTags([]);
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
            <Button secondary onClick={() => setIsFilterOpen(true)}>
              Filter
              {selectedTags.length > 0 && (
                <small>({selectedTags.length})</small>
              )}
            </Button>
            <Button onClick={() => setIsRecipeModalOpen(true)}>New</Button>
          </div>
        </div>
        {/* Header of the dashboard page end */}

        {/* Loading and displaying the recipes start */}
        {isLoading ? (
          <div className="load">
            <Loader dark />
          </div>
        ) : (
          <Pagination
            items={found.length === 0 ? recipes : found}
            itemsPerPage={10}
          />
        )}
        {/* Loading and displaying the recipes end */}

        {/* Show filter modal start */}
        {isFilterOpen && (
          <Modal title="Select Tags" close={closeFilterModal}>
            <FilterTags
              items={recipes}
              selected={selectedTags}
              select={addTag}
              remove={removeTag}
              onSubmit={handleSearch}
              onClear={removeAllTags}
            />
          </Modal>
        )}
        {/* Show filter modal end */}

        {/* Show recipe creatin modal start */}
        {isRecipeModalOpen && (
          <Modal title="Add Recipe" close={() => setIsRecipeModalOpen(false)}>
            <RecipeInfoForm
              onSubmit={addNewRecipe}
              buttonText="Create recipe"
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

// Exporting the component
export default Dashboard;
