import { useEffect, useState } from "react";
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

// Importing the style file
import "./Dashboard.css";

// Creating the Dashboard component
const Dashboard = () => {
  // Getting the state from the store
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const recipes = useSelector((state) => state.recipes.recipes);

  // Setting ut the state
  const [found, setFound] = useState(recipes);

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
  const handleSearch = (term) => {
    if (term.split(" ").join("") === "") setFound(recipes);
    else
      setFound(
        recipes.filter((recipe) => recipe.title.toLowerCase().includes(term))
      );
  };

  return (
    <div className="dashboard">
      <div className="container">
        <div className="header">
          <SearchBar onChange={handleSearch} />
          <Button>New</Button>
        </div>
        {recipes.length === 0 ? (
          <div className="load">
            <Loader dark />
          </div>
        ) : (
          <Pagination items={found} itemsPerPage={10} />
        )}
      </div>
    </div>
  );
};

// Exporting the component
export default Dashboard;
