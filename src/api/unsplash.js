import axios from "axios";

// Creating the fetching function
export const searchImages = async (query) => {
  const { data } = await axios.get("https://api.unsplash.com/search/photos", {
    headers: {
      Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_KEY}`,
    },
    params: {
      query,
      w: "200px",
      h: "300px",
      fm: "png",
    },
  });
  return data.results;
};
