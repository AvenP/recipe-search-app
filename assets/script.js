document.addEventListener("DOMContentLoaded", () => {
  const spoonacularApiKey = "3508c499e2844bffb6e689336e37581e"; // Spoonacular API key
  const youtubeApiKey = "AIzaSyCwtyxUDnn7btJ_P8uFBH9yCw1hd731Ya4"; // YouTube API key

  // Function to search for YouTube videos
  async function searchVideos(query) {
    const youtubeURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&recipe&maxResults=5&q=${query}&key=${youtubeApiKey}`;
    const response = await fetch(youtubeURL);
    const data = await response.json();
    return data.items;
  }

  // Function to display video results
  function displayVideos(videos) {
    const resultsContainer = document.getElementById("results-container");
    resultsContainer.innerHTML = "";

    videos.forEach((video) => {
      const videoCard = document.createElement("div");
      videoCard.classList.add("video-card");

      const title = document.createElement("h3");
      title.innerText = video.snippet.title;

      const thumbnail = document.createElement("img");
      thumbnail.src = video.snippet.thumbnails.medium.url;

      const videoLink = document.createElement("a");
      videoLink.href = `https://www.youtube.com/watch?v=${video.id.videoId}`;
      videoLink.target = "_blank";
      videoLink.innerText = "Watch on YouTube";

      videoCard.appendChild(title);
      videoCard.appendChild(thumbnail);
      videoCard.appendChild(videoLink);
      resultsContainer.appendChild(videoCard);
    });
  }

  // Function to search for recipes using Spoonacular API
  async function searchRecipes(query) {
    const url = `https://api.spoonacular.com/recipes/search?apiKey=${spoonacularApiKey}&query=${query}`;
    const response = await fetch(url);
    const data = await response.json();

    const recipes = data.results;

    // Get nutrition information for each recipe
    const promises = recipes.map(recipe => {
      const nutritionUrl = `https://api.spoonacular.com/recipes/${recipe.id}/nutritionWidget.json?apiKey=${spoonacularApiKey}`;
      return fetch(nutritionUrl)
        .then(response => response.json())
        .then(nutritionData => {
          recipe.nutrition = nutritionData;
          return recipe;
        });
    });

    // Wait for all the nutrition requests to complete before returning the recipes
    await Promise.all(promises);

    return recipes;
  }

  async function getRecipeDetails(recipeId, nutritionValue) {
    const url = `https://api.spoonacular.com/recipes/${recipeId}/nutritionWidget.json?apiKey=${spoonacularApiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    const nutrition = data;
    const nutritionArray = [];

    switch (nutritionValue) {
      case 'calories':
        nutritionArray.push(nutrition.calories);
        break;
      case 'carbs':
        nutritionArray.push(nutrition.carbs);
        break;
      case 'fat':
        nutritionArray.push(nutrition.fat);
        break;
      case 'protein':
        nutritionArray.push(nutrition.protein);
        break;
      default:
        nutritionArray.push(nutrition);
    }

    const summaryUrl = `https://api.spoonacular.com/recipes/${recipeId}/summary?apiKey=${spoonacularApiKey}`;
    const summaryResponse = await fetch(summaryUrl);
    const summaryData = await summaryResponse.json();
    const summary = summaryData.summary;

    return { nutritionArray, summary };
  }
  async function displayRecipesWithDetails(recipes) {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '';
  
    for (const recipe of recipes) {
      const { nutritionArray, summary } = await getRecipeDetails(recipe.id, 'calories');
  
      const recipeCard = document.createElement('div');
      recipeCard.classList.add('recipe-card');
  
      const title = document.createElement('h3');
      title.innerText = recipe.title;
  
      const image = document.createElement('img');
      image.src = 'https://spoonacular.com/recipeImages/' + recipe.id + '-636x393.jpg';
      image.alt = recipe.title;
  
      const nutritionTable = document.createElement('table');
      const nutritionRow = document.createElement('tr');
      const nutritionHeader = document.createElement('th');
      nutritionHeader.innerText = 'Nutrition';
      const nutritionValue = document.createElement('td');
      nutritionValue.innerText = nutritionArray[0];
      nutritionRow.appendChild(nutritionHeader);
      nutritionRow.appendChild(nutritionValue);
      nutritionTable.appendChild(nutritionRow);
  
      // Replace HTML tags in summary text with an empty string
      const summaryText = summary.replace(/<[^>]*>/g, '');
  
      const description = document.createElement('p');
      description.innerText = summaryText;
  
      // Add a link to the recipe on Spoonacular
      const link = document.createElement('a');
      link.href = recipe.sourceUrl;
      link.innerText = 'View recipe on Spoonacular';
  
      recipeCard.appendChild(title);
      recipeCard.appendChild(image);
      recipeCard.appendChild(nutritionTable);
      recipeCard.appendChild(description);
      recipeCard.appendChild(link);
      resultsContainer.appendChild(recipeCard);
    }
  }
    // Event listener for videos button
const videosButton = document.getElementById('videos-button');
videosButton.addEventListener('click', async () => {
  const searchInput = document.getElementById('search-input');
  const query = searchInput.value;

  if (query) {
    const videos = await searchVideos(query);
    displayVideos(videos);
  }
});
  // Event listener for search button
  const searchButton = document.getElementById('search-button');
  searchButton.addEventListener('click', async () => {
    const searchInput = document.getElementById('search-input');
    const query = searchInput.value;

    if (query) {
      const recipes = await searchRecipes(query);
      displayRecipesWithDetails(recipes);
    }
  });

  
  document
    .querySelector("#close-modal")
    .addEventListener(
      "click",
      () => (document.querySelector("#recipe-modal").style.display = "none")
    );
});

/* APIs
Rojan's spoonacular API key: 3508c499e2844bffb6e689336e37581e
*/
