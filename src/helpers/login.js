// importing the API functions
import { login, signup } from "../api/login";

// function that will handle the login
export const handleLogin = async (formData) => {
  const data = {
    email: formData.email.value,
    password: formData.password.value,
  };
  const response = await login(data);
  console.log(response);
};

// Funciton that will handle the sign up
export const handleSignup = async (formData) => {
  const data = {
    name: formData.name.value,
    email: formData.email.value,
    password: formData.password.value,
  };
  const response = await signup(data);
  console.log(response);
};
