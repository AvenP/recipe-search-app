const spoonacularApiKey = "8890df0c7f4342d786bbf12dd13f8cdb";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "4c0ee838e5mshf65a5167a5972bep1c3d22jsnd597bc713816",
    "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
  },
};
fetch(
  "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/479101/information",
  options
)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((err) => console.error(err));

async function searchRecipes(query) {
  const url = `https://api.spoonacular.com/recipes/search?apiKey=${spoonacularApiKey}&query=${query}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
  console.log(data.results);
}
