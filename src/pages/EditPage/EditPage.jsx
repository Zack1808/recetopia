import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

// Importing the context hook
import { useNavigate } from "../../context/navigation";

// Importign the api functions
import { getRecipe } from "../../api/fetchRecipes";
import { searchImages } from "../../api/unsplash";

// Importing the costume components
import Loader from "../../components/Loader/Loader";
import Button from "../../components/Button/Button";

// Importing the style file
import "./EditPage.css";

// Creating the EditPage component
const EditPage = () => {
  // Getting data from the store
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const user = useSelector((state) => state.user.user);

  // Setting up the state
  const [isLoading, setIsLoading] = useState(true); // Will contain informaiton if the recipe is still being fetched or not
  const [recipe, setRecipe] = useState(null);
  const [images, setImages] = useState(null);

  // Getting the navigate function
  const { navigate, currentPath } = useNavigate();

  // Rerouting the user if he is not logged in
  useEffect(() => {
    if (!isLoggedIn && !!!Cookies.get("persistentLogin")) navigate("/");
    else {
      const id = currentPath.substring(
        currentPath.lastIndexOf("/") + 1,
        currentPath.length
      );
      try {
        fetchRecipe(id);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  // Fetching the images once the recepie info has been fetched
  useEffect(() => {
    getImages();
  }, [recipe]);

  // Function that will fetch the specific recipe
  const fetchRecipe = async (id) => {
    const data = await getRecipe(id);
    setRecipe(data.recipe);
  };

  // Function that will fetch the images
  const getImages = async () => {
    recipe && setImages(await searchImages(recipe.title));
    setIsLoading(false);
  };

  return (
    <div className="edit-page">
      <div className="container">
        {isLoading ? (
          <div className="load">
            <Loader dark />
          </div>
        ) : (
          <>
            <div className="image">
              {images && (
                <img
                  src={images[0].urls.regular}
                  alt={images[0].alt_description}
                />
              )}
            </div>
            <div className="data">
              <div className="header">
                <h1>{recipe && recipe.title}</h1>
                <div className="description">
                  <small>Id: {recipe && recipe.id}</small>
                  <small>Created by: {recipe && recipe.authorId}</small>
                  <small>Created on: {recipe && recipe.dateCreated}</small>
                </div>
                <div className="tags">
                  <h4>Tags:</h4>
                  <div className="tag-list">
                    {recipe &&
                      recipe.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </div>
              </div>
              <div className="list">
                <h3>Instructions</h3>
                <ol>
                  {recipe &&
                    recipe.instructions.map((instruction) => (
                      <li key={instruction}>{instruction}</li>
                    ))}
                </ol>
              </div>
              {user && recipe && user.id === recipe.authorId && (
                <div className="buttons">
                  <Button secondary>Delete</Button>
                  <Button>Edit</Button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// exporting the component
export default EditPage;
