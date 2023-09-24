// function that will handle the login
export const handleLogin = (formData) => {
  const email = formData.email.value;
  const password = formData.password.value;
  console.log(email, password);
};

// Funciton that will handle the sign up
export const handleSignup = (formData) => {
  const name = formData.name.value;
  const email = formData.email.value;
  const password = formData.password.value;
  const data = {
    name,
    email,
    password,
  };
  console.log(data);
};
