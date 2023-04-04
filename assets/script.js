//Array for autocomplete
//Please add to
const autosearch = [
    //by type
    "Pizza","Pasta","Pumkin Pie","Chili","Soup","Casserole","Desserts","Cake","Pie","Fried Rice","Rice",
    //by fruit/veg
    "Apples","Bananas","Coconut","Celery","Dragonfruit","Figs","Berries","Strawberry","Mushroom","Onions","Carrots","Broccoli","Peas","Potatoes",
    //by protein
    "Beef","Chicken","Turkey","Eggs","Pork","Tofu","Sausage","Fish","Shrimp","Lobster","Crab","Crawfish"
    ];

//Autocomplete
function autocomplete(inp, autosearch) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < autosearch.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (autosearch[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + autosearch[i].substr(0, val.length) + "</strong>";
          b.innerHTML += autosearch[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + autosearch[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}
/*execute a function when someone clicks in the document:*/
document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});
}
//==============================

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

  // Event listener for search button
  const searchButton = document.getElementById("search-button");
  searchButton.addEventListener("click", async () => {
    const searchInput = document.getElementById("search-input");
    const query = searchInput.value;

    if (query) {
      const recipes = await searchRecipes(query);
      const videos = await searchVideos(query);
      displaySearchResults(recipes);
      displayVideos(videos);
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

/* APIs
Rojan's spoonacular API key: 3508c499e2844bffb6e689336e37581e
*/
