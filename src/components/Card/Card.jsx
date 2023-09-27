import { useEffect, useState } from "react";

// Importing the api funciton
import { searchImages } from "../../api/unsplash";

// Importing the style file
import "./Card.css";

// Creating the Card component
const Card = ({ children, imageName = "" }) => {
  // Setting up the state
  const [images, setImages] = useState(null);

  // Fetching the images nomount
  useEffect(() => {
    fetchImages();

    // eslint-disable-next-line
  }, []);

  // Function that will handle the fetching of the images
  const fetchImages = async () => {
    setImages(await searchImages(imageName));
  };

  return (
    <div
      style={{ backgroundImage: `url(${images && images[0].urls.small_s3})` }}
      className="card"
    >
      {children}
    </div>
  );
};

// Exporting the component
export default Card;
