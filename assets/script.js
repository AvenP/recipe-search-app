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
  
      const thumbnail = document.createElement('img');
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
  // Event listener for videos button
const videosButton = document.getElementById('videos-button');
videosButton.addEventListener('click', async () => {
  const searchInput = document.getElementById('search-input');
  const query = searchInput.value;

  // Event listener for search button
  const searchButton = document.getElementById("search-button");
  searchButton.addEventListener("click", async () => {
    const searchInput = document.getElementById("search-input");
    const query = searchInput.value;

    if (query) {
      const recipes = await searchRecipes(query);
      displayRecipesWithDetails(recipes);
    }
  });

  // Function to search for recipes using Spoonacular API
  async function searchRecipes(query) {
    const spoonURL = `https://api.spoonacular.com/recipes/search?apiKey=${spoonacularApiKey}&query=${query}`;
    const response = await fetch(spoonURL);
    const data = await response.json();
    return data.results;
  }

  // Function to display recipe results
  function displaySearchResults(recipes) {
    const resultsContainer = document.getElementById("results-container");
    resultsContainer.innerHTML = "";

    recipes.forEach((recipe) => {
      console.log(recipe);
      sourceURL = recipe.sourceUrl;
      const recipeExtractURL = `https://api.spoonacular.com/recipes/extract?url=${sourceURL}&apiKey=${spoonacularApiKey}`;
      const recipeCard = document.createElement("button");
      recipeCard.classList.add("recipe-card");

      const title = document.createElement("h3");
      title.innerText = recipe.title;

      const image = document.createElement("img");
      image.src = `https://spoonacular.com/recipeImages/${recipe.image}`;

      recipeCard.appendChild(title);
      recipeCard.appendChild(image);
      recipeCard.addEventListener("click", () =>
        displayRecipe(recipeExtractURL)
      );
      resultsContainer.appendChild(recipeCard);
    });
  }

  function displayRecipe(recipeExtractURL) {
    fetch(recipeExtractURL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        document.querySelector("#recipe-modal").style.display = "block";
        document.querySelector("#modal-title").innerText = data.title;
        document.querySelector("#modal-recipe-instructions").innerHTML =
          data.instructions;
      });
  }
  document
    .querySelector("#close-modal")
    .addEventListener(
      "click",
      () => (document.querySelector("#recipe-modal").style.display = "none")
    );
});
})