export const search = (term, selectedTags, recipes) => {
  // Will set the state to contain all recipes if neither a tag or a search term has been given
  if (term.split(" ").join("") === "" && selectedTags.length === 0)
    return recipes;
  // Will return all recipes that contain the selected tags and contain the searched term in the title
  else if (selectedTags.length !== 0 && term.split(" ").join("") !== "") {
    const items = recipes.filter((recipe) =>
      recipe.tags.some((tag) => selectedTags.includes(tag))
    );
    return items.filter((item) =>
      item.title.toLowerCase().includes(term.toLowerCase())
    );
  }

  // Will return all recipes which containt the search term in the title
  else if (selectedTags.length === 0 && term.split(" ").join("") !== "") {
    return recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(term.toLowerCase())
    );
  }

  // Will return all items with the selected tag
  return recipes.filter((recipe) =>
    recipe.tags.some((tag) => selectedTags.includes(tag))
  );
};
