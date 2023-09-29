// Function that will compare two arrays
export const compareArrays = (arr1, arr2) => {
  // Check if the arrays are the same length
  if (arr1.length !== arr2.length) return false;
  else {
    // Sort the arrays
    const sorted1 = arr1.slice().sort();
    const sorted2 = arr2.slice().sort();

    // Check if the arrays contain the same elements
    for (let i = 0; i < sorted1.length; i++) {
      console.log(sorted1[i], sorted2[i]);
      if (sorted1[i] !== sorted2[i]) return false;
    }
  }

  return true;
};
