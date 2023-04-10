const autosearch = [
  //by type
  "Pizza",
  "Pasta",
  "Pumkin Pie",
  "Chili",
  "Soup",
  "Casserole",
  "Desserts",
  "Cake",
  "Pie",
  "Fried Rice",
  "Rice",
  "Cookies",
  "Meatloaf",
  "Mac and Cheese",
  "Burgers",
  "Appetizers",
  "Sandwhich",
  "Crab Cakes",
  "Deviled Eggs",
  "Stuffed Jalepeno",
  "Stuffed Peppers",
  "Stuffed Pasta",
  "Cajun",
  "Ballpark Favorites",
  "Tacos",
  "Fajitas",
  "Salad",
  "Chicken Wings",
  "Cheesesteak",
  "Crockpot",
  //by fruit/veg
  "Apples",
  "Bananas",
  "Coconut",
  "Celery",
  "Dragonfruit",
  "Figs",
  "Berries",
  "Strawberry",
  "Mushroom",
  "Onions",
  "Carrots",
  "Broccoli",
  "Peas",
  "Potatoes",
  "Tomato",
  "Corn",
  "Spinach",
  "Pears",
  "Peaches",
  "Plums",
  "Oranges",
  "Lime",
  "Lemmon",
  "Cilantro",
  "Parsely",
  "Basil",
  "Grapes",
  "Shallots",
  "Jack Fruit",
  "Raddish",
  "Cucumber",
  "Zuccini",
  "Jalepeno",
  "Bell Pepper",
  "Raspberry",
  "Avocado",
  "Green Beans",
  "Pinto Beans",
  "Black Beans",
  "Black-eyed Peas",
  "Squash",
  "Okra",
  "Collard Greens",
  "Red Potatoes",
  //by protein
  "Beef",
  "Chicken",
  "Turkey",
  "Eggs",
  "Pork",
  "Tofu",
  "Sausage",
  "Fish",
  "Shrimp",
  "Lobster",
  "Crab",
  "Crawfish",
  "Brisket",
  "Vegetarian",
  "Pescatarian",
  "Scallops",
  "Clams",
  "Veal",
  "Octopus",
  "Calamari",
  "Squid",
  //by diet restriction
  "Keto",
  "Low-Sodium",
  "Low Fat",
  //by 'other'
  "Chocolate",
  "White Chocolate",
  "Peanuts",
  "Walnuts",
  "Pecans",
  "Bread",
  "Dough",
  "Coffee",
  "Milk",
  "Queso",
  "Cheese",
  //by cuisine
  "Indian",
  "Chinese",
  "Thia",
  "Japanese",
  "Southwest American",
  "Canadian",
  "Mexican",
  "Tex-Mex",
  "British",
  "French",
  "Spanish",
  "Eastern European",
  "South American",
];
autosearch.sort();

function autocomplete(inp, autosearch) {
  var currentFocus;
  inp.addEventListener("input", function (e) {
    var a,
      b,
      i,
      val = this.value;
  closeAllLists();
  if (!val) {
    return false;
  }
  currentFocus = -1;
  a = document.createElement("DIV");
  a.setAttribute("id", this.id + "autocomplete-list");
  a.setAttribute("class", "autocomplete-items");
  this.parentNode.appendChild(a);
  for (i = 0; i < autosearch.length; i++) {
    if (
      autosearch[i].substr(0, val.length).toUpperCase() == val.toUpperCase()
    ) {
      b = document.createElement("DIV");
      b.classList.add("autocomplete");
      b.setAttribute("value", autosearch[i]);
      b.innerHTML =
        "<strong>" + autosearch[i].substr(0, val.length) + "</strong>";
      b.innerHTML += autosearch[i].substr(val.length);
      b.innerHTML += "<input type='hidden' value='" + autosearch[i] + "'>";
      b.addEventListener("click", function (e) {
        inp.value = this.getElementsByTagName("input")[0].value;
        closeAllLists();
      });
        a.appendChild(b);
    }
  }
});
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      currentFocus++;
      addActive(x);
    } else if (e.keyCode == 38) {
      currentFocus--;
      addActive(x);
    } else if (e.keyCode == 13) {
      e.preventDefault();
      if (currentFocus > -1) {
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  $(document).on("click", "div.autocomplete", function (e) {
    if ($(e.target).is(".autocomplete")) {
      closeAllLists(e.target);
      var query = $(e.target).attr("value");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const spoonacularApiKey = "fbea9de7dc21482db3eff5c3ba63e63b"; // Spoonacular API key
  const youtubeApiKey = "AIzaSyCwtyxUDnn7btJ_P8uFBH9yCw1hd731Ya4"; // YouTube API key

  async function searchRecipes(query) {
    const url = `https://api.spoonacular.com/recipes/search?apiKey=${spoonacularApiKey}&query=${query}&number=6`;
    const response = await fetch(url);
    const data = await response.json();
    const recipes = data.results;
    const recipeIds = recipes.map((recipe) => recipe.id);
    console.log(recipeIds);
    return recipes;
  }

  async function displayRecipesWithDetails(recipes) {
    const resultsContainer = document.getElementById("results-container");
    resultsContainer.innerHTML = "";
    for (const recipe of recipes) {
      const recipeCard = document.createElement("div");
      recipeCard.classList.add("recipe-card");
      const title = document.createElement("h3");
      title.innerText = recipe.title;
      const image = document.createElement("img");
      image.src =
        "https://spoonacular.com/recipeImages/" + recipe.id + "-636x393.jpg";
      image.alt = recipe.title;
      const summaryText = recipe.summary
      ? recipe.summary.replace(/<[^>]*>/g, "")
        : "";
      const description = document.createElement("p");
      description.innerText = summaryText;
      const link = document.createElement("a");
      link.href = recipe.sourceUrl;
      link.innerText = "View recipe on Spoonacular";
      recipeCard.appendChild(title);
      recipeCard.appendChild(image);
      recipeCard.appendChild(description);
      recipeCard.appendChild(link);
      resultsContainer.appendChild(recipeCard);
    }
  }
  async function searchVideos(query) {
    query = query + " food " + "recipe";
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${query}&key=${youtubeApiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.items;
  }

  function displayVideos(videos) {
    const videoResultsContainer = document.getElementById(
      "video-results-container"
    );
    videoResultsContainer.innerHTML = "";
    videos.forEach((video) => {
      const videoCard = document.createElement("div");
      videoCard.classList.add("video-card");
      const title = document.createElement("h3");
      title.innerText = video.snippet.title;
      const thumbnail = document.createElement("img");
      thumbnail.src = video.snippet.thumbnails.medium.url;
      const videoLink = document.createElement("button");
      videoLink.innerText = "Watch Video";
      videoLink.addEventListener("click", displayVideoModal);
      function displayVideoModal() {
        document.querySelector("#recipe-modal").style.display = "block";
        document.querySelector("#modal-title").innerText = video.snippet.title;
        document.querySelector(
          "iframe"
        ).src = `https://www.youtube.com/embed/${video.id.videoId}`;
      }
      videoCard.appendChild(title);
      videoCard.appendChild(thumbnail);
      videoCard.appendChild(videoLink);
      videoResultsContainer.appendChild(videoCard);
    });
  }

  const videosButton = document.getElementById("videos-button");
  videosButton.addEventListener("click", async () => {
    const searchInput = document.getElementById("search-input");
    if (query) {
      const videos = await searchVideos(query);
      displayVideos(videos);
    }
  });
  const searchButton = document.getElementById("search-button");
  searchButton.addEventListener("click", async () => {
    const searchInput = document.getElementById("myInput");
    console.log(searchInput.value);
    query = searchInput.value;
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
Rojan's API key: fbea9de7dc21482db3eff5c3ba63e63b
(500 calls a month for Youtube and 3,000 for spoonacular)*/
/* APIs
Rojan's spoonacular API key: 3508c499e2844bffb6e689336e37581e
Matt's spoonacular API key:  e2ebf5f91be9ed84ff7b3315f93cff5d
Matt's YouTube API key:  AIzaSyCWp4wXg1lqxDk9sfVm91BMkBfeDTnfaIU
*/
