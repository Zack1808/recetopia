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
import RecipeInfoForm from "../../components/RecipeInfoForm/RecipeInfoForm";

// Importing the style file
import "./EditPage.css";

// Creating the EditPage component
const EditPage = () => {
  // Getting data from the store
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const user = useSelector((state) => state.user.user);

  // Setting up the state
  const [isLoading, setIsLoading] = useState(true); // Will contain informaiton if the recipe is still being fetched or not
  const [recipe, setRecipe] = useState(null); // Will containt the information about the recipe
  const [images, setImages] = useState(null); // Will contain the images
  const [isEditing, setIsEditing] = useState(false); // Contains info if the edit form should be displayed or not

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
    recipe && setIsLoading(false);
  };

  // Function that will toggle the edit status
  const toggleEdit = () => {
    setIsEditing((prevState) => !prevState);
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
            {/* Displaying the image start */}
            <div
              className="image"
              style={{
                backgroundImage: `url(${images && images[0].urls.regular})`,
              }}
            ></div>
            {/* Displaying the image end */}

            {/* Displaying the recipe data start */}
            <div className="data">
              {isEditing ? (
                <RecipeInfoForm
                  buttonText="Update recipe"
                  item={recipe}
                  cancel={toggleEdit}
                />
              ) : (
                <>
                  {/* Displaying the header informaiton start */}
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
                          recipe.tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                          ))}
                      </div>
                    </div>
                  </div>
                  {/* Displaying the header information end */}

                  {/* Displaying the instructions start */}
                  <div className="list">
                    <h3>Instructions</h3>
                    <ol>
                      {recipe &&
                        recipe.instructions.map((instruction) => (
                          <li key={instruction}>{instruction}</li>
                        ))}
                    </ol>
                  </div>
                  {/* Displaying the instructions end */}

                  {/* Displaying the buttons in case the user created the recipe start */}
                  {user && recipe && user.id === recipe.authorId && (
                    <div className="buttons">
                      <Button secondary>Delete</Button>
                      <Button onClick={toggleEdit}>Edit</Button>
                    </div>
                  )}
                  {/* Displaying the buttons in case the user created the recipe end */}
                </>
              )}
            </div>
            {/* Displaying the recipe data end */}
          </>
        )}
      </div>
    </div>
  );
};

// exporting the component
export default EditPage;
