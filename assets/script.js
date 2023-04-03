
document.addEventListener('DOMContentLoaded', () => {
  const spoonacularApiKey = '8890df0c7f4342d786bbf12dd13f8cdb'; // Spoonacular API key
  const youtubeApiKey = 'AIzaSyCxbJgWs74BBSzF8lNPZNQwCOw--k1rarY'; // YouTube API key

  //Autocomplete
  $(document).ready(function () {
  
    $("#searchInput").keyup(function (e) {
        if (e.which == 40) {
            $("#autoCompleteSelect").val($("#autoCompleteSelect option:first").val());
            $("#autoCompleteSelect").focus();
            $(this).val($("#autoCompleteSelect :selected").text());
        }
        else {
            if ($(this).val().length > 2)
                FillAutoComplete($(this).val());
            else
                $("#autoCompleteDiv").hide();
        }
    });

});
//key up event 
  
function FillAutoComplete(value) {
  $.ajax({
      type: "POST",
      url: "Autocomplete/FillAutoComplete",
      contentType: "application/json; charset=utf-8",
      data: '{"value":"' + value + '"}',
      dataType: "html",
      success: function (result, status, xhr) {
          $("#autoCompleteDiv").html(value);
          $("#autoCompleteDiv").show();
      },
      error: function (xhr, status, error) {
          alert(xhr + " " + status + " " + error);
      }
  });
  return false;
}

  // Function to search for recipes using Spoonacular API
  async function searchRecipes(query) {
    const url = `https://api.spoonacular.com/recipes/search?apiKey=${spoonacularApiKey}&query=${query}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  }

  // Function to display recipe results
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

      recipeCard.appendChild(title);
      recipeCard.appendChild(image);
      resultsContainer.appendChild(recipeCard);
    });
  }

  // Function to search for YouTube videos
  async function searchVideos(query) {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${query}+"recipe"&key=${youtubeApiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.items;
  }

  // Function to display video results
  function displayVideos(videos) {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '';

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
      resultsContainer.appendChild(videoCard);
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

//key up event 
  
function FillAutoComplete(value) {
    $.ajax({
        type: "POST",
        url: "Autocomplete/FillAutoComplete",
        contentType: "application/json; charset=utf-8",
        data: '{"value":"' + value + '"}',
        dataType: "html",
        success: function (result, status, xhr) {
            $("#autoCompleteDiv").html(value);
            $("#autoCompleteDiv").show();
        },
        error: function (xhr, status, error) {
            alert(xhr + " " + status + " " + error);
        }
    });
    return false;
}
/* APIs
Rojan's API key: FJVk2YSVm3Vi9Pg1Tv99XarbQ2Vlqv1k
(500 calls a month for Youtube and 3,000 for spoonacular)*/
 /*main*/
