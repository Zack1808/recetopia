import axios from "axios";

// Function that will handle the login post request
export const login = async (data) => {
  try {
    const response = await axios.post(
      "https://login-zazjbx7nka-uc.a.run.app/",
      data,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AUTHID}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (err) {
    return err;
  }
};

// Function that will handle the sign up
export const signup = async (data) => {
  try {
    const response = await axios.post(
      "https://addappuser-zazjbx7nka-uc.a.run.app/",
      data,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AUTHID}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (err) {
    return err;
  }
};
