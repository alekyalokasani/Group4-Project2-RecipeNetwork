export const allRecipes = () => {
  return fetch("http://localhost:5001/api/recipes/allrecipes", {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getARecipe = (id) => {
  return fetch(`http://localhost:5001/api/recipe/${id}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const createRecipe = (user_id, recipe) => {
  return fetch(`http://localhost:5001/api/recipes/newrecipe/${user_id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  })
    .then((response) => {
      response.json();
    })
    .catch((err) => console.log(err));
};

export const getUserRecipes = (user_id) => {
  return fetch(`http://localhost:5001/api/recipes/getuserrecipes/${user_id}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const deleteRecipe = (recipe_id) => {
  return fetch(`http://localhost:5001/api/recipes/deleteRecipe/${recipe_id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
