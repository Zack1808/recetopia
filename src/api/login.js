import axios from "axios";

// Function that will handle the login post request
export const login = async (body) => {
  const { data } = await axios.post(
    "https://login-zazjbx7nka-uc.a.run.app/",
    body,
    {
      headers: {
        authid: process.env.REACT_APP_AUTHID,
      },
      mode: "no-cors",
    }
  );
  return data;
};

// Function that will handle the sign up
export const signup = async (body) => {
  const { data } = await axios.post(
    "https://addappuser-zazjbx7nka-uc.a.run.app/",
    body,
    {
      headers: {
        authid: process.env.REACT_APP_AUTHID,
      },
      mode: "no-cors",
    }
  );
  return data;
};
