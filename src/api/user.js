import axios from "axios";

// Function that will return the user data
export const fetchUser = async (id) => {
  const { data } = await axios.get(
    "https://getappuser-zazjbx7nka-uc.a.run.app/",
    {
      headers: {
        authid: process.env.REACT_APP_AUTHID,
      },
      params: {
        appUserId: id,
      },
    }
  );
  return data;
};
