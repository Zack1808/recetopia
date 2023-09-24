// Function that checks if the string contains a lowercase/uppercase letter
export const checkLetter = (str, letterState) => {
  if (letterState === "lowerCase") {
    // Will check every character and return true if there is a lower case letter
    for (let i = 0; i < str.length; i++)
      if (str[i] !== str[i].toUpperCase()) return true;
  } else {
    // Will check every character and return true if there is a capital letter
    for (let i = 0; i < str.length; i++)
      if (str[i] !== str[i].toLowerCase()) return true;
  }
};

// Function that will check if a number is contained in the string
export const checkNumber = (str) => {
  for (let i = 0; i < str.length; i++) if (!isNaN(str[i])) return true;
};

// Function that will check if there is a special character in the string
export const checkSpecialChar = (str) => {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};'"\\|,.<>\/?~]/;
  return specialChars.test(str);
};
