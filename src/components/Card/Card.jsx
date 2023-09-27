import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

// Importing the api funciton
import { searchImages } from "../../api/unsplash";

// Importing the style file
import "./Card.css";

// Creating the Card component
const Card = ({ children, imageName = "" }) => {
  // Setting up the state
  const [images, setImages] = useState(null);

  // Setting up the observer
  const [ref, inView] = useInView({
    threshold: 0.1,
  });

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
      ref={ref}
      style={{ backgroundImage: `url(${images && images[0].urls.small_s3})` }}
      className={`card ${inView ? "visible" : ""}`}
    >
      {children}
    </div>
  );
};

// Exporting the component
export default Card;
