document.addEventListener('DOMContentLoaded', () => {
  const spoonacularApiKey = '8890df0c7f4342d786bbf12dd13f8cdb'; // Spoonacular API key
  const youtubeApiKey = 'AIzaSyCxbJgWs74BBSzF8lNPZNQwCOw--k1rarY'; // YouTube API key

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
  

  function displayRecipes(recipes) {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '';
  
    recipes.forEach(recipe => {
      const recipeCard = document.createElement('div');
      recipeCard.classList.add('recipe-card');
  
      const title = document.createElement('h3');
      title.innerText = recipe.title;
  
      const image = document.createElement('img');
      image.src = `https://spoonacular.com/recipeImages/${recipe.image}`;
  
      const description = document.createElement('p');
      if (recipe.summary) {
        description.innerText = recipe.summary;
      } else if (recipe.instructions) {
        description.innerText = recipe.instructions;
      } else {
        description.innerText = 'No recipe available.';
      }
  
      const nutrition = document.createElement('div');
      nutrition.classList.add('nutrition-info');
      nutrition.innerHTML = `
        <h4>Nutrition Information</h4>
        <ul>
          <li>Calories: ${recipe.nutrition.calories}</li>
          <li>Protein: ${recipe.nutrition.protein}</li>
          <li>Carbohydrates: ${recipe.nutrition.carbs}</li>
          <li>Fat: ${recipe.nutrition.fat}</li>
        </ul>
      `;
  
      recipeCard.appendChild(title);
      recipeCard.appendChild(image);
      recipeCard.appendChild(description);
      recipeCard.appendChild(nutrition);
      resultsContainer.appendChild(recipeCard);
    });
  }
  

  // Function to search for YouTube videos
  async function searchVideos(query) {
    query = query + " food "+"recipe";

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${query}&key=${youtubeApiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.items;
  }

  // Function to display video results
  function displayVideos(videos) {
    const videoResultsContainer = document.getElementById('video-results-container');
    videoResultsContainer.innerHTML = '';
  
    videos.forEach(video => {
      const videoCard = document.createElement('div');
      videoCard.classList.add('video-card');
  
      const title = document.createElement('h3');
      title.innerText = video.snippet.title;
  
      const thumbnail = document.createElement('img');
      thumbnail.src = video.snippet.thumbnails.medium.url;
  
      const videoLink = document.createElement('a');
      videoLink.href = `https://www.youtube.com/watch?v=${video.id.videoId}`;
      videoLink.target = '_blank';
      videoLink.innerText = 'Watch on YouTube';
  
      videoCard.appendChild(title);
      videoCard.appendChild(thumbnail);
      videoCard.appendChild(videoLink);
      videoResultsContainer.appendChild(videoCard);
    });
  }
  

  // Event listener for search button
  const searchButton = document.getElementById('search-button');
  searchButton.addEventListener('click', async () => {
    const searchInput = document.getElementById('search-input');
    const query = searchInput.value;

    if (query) {
      const recipes = await searchRecipes(query);
      const videos = await searchVideos(query);
      displayRecipes(recipes);
      displayVideos(videos);
    }
  });
});

