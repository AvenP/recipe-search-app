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
  "Sandwich",
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
//Alphabetize Array

autosearch.sort();

//Autocomplete
function autocomplete(inp, autosearch) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function (e) {
    var a,
      b,
      i,
      val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) {
      return false;
    }
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
      if (
        autosearch[i].substr(0, val.length).toUpperCase() == val.toUpperCase()
      ) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        b.classList.add("autocomplete");
        b.setAttribute("value", autosearch[i]);
        /*make the matching letters bold:*/
        b.innerHTML =
          "<strong>" + autosearch[i].substr(0, val.length) + "</strong>";
        b.innerHTML += autosearch[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + autosearch[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function (e) {
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
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) {
      //up
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
    if (currentFocus < 0) currentFocus = x.length - 1;
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
  $(document).on("click", "div.autocomplete", function (e) {
    if ($(e.target).is(".autocomplete")) {
      closeAllLists(e.target);
      var query = $(e.target).attr("value");
    }
  });
}

/*
const recipeBookmarks;
if (localStorage.getItem("recipeBookmarks")) {
  recipeBookmarks = JSON.parse(localStorage.getItem("recipeBookmarks"))
} else {
  recipeBookmarks = {};
}
if (localStorage.getItem("youtubeBookmarks")) {
  youtubeBookmarks = JSON.parse(localStorage.getItem("youtubeBookmarks"));
} else {
  youtubeBookmarks = {};
}*/

document.addEventListener("DOMContentLoaded", () => {
  const spoonacularApiKey = "fbea9de7dc21482db3eff5c3ba63e63b"; // Spoonacular API key
  const youtubeApiKey = "AIzaSyCwtyxUDnn7btJ_P8uFBH9yCw1hd731Ya4"; // YouTube API key
  const recipeBookmarks = {};
  const youtubeBookmarks = {};

  async function searchRecipes(query) {
    const url = `https://api.spoonacular.com/recipes/search?apiKey=${spoonacularApiKey}&query=${query}&number=6`;
    const response = await fetch(url);
    const data = await response.json();

    const recipes = data.results;
    const recipeIds = recipes.map((recipe) => recipe.id);

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

      // const summaryText = recipe.summary
      //   ? recipe.summary.replace(/<[^>]*>/g, "")
      //   : "";
      // const description = document.createElement("p");

      // description.innerText = summaryText;

      const link = document.createElement("button");
      // link.href = recipe.sourceUrl;
      link.innerText = "View recipe on Spoonacular";

      const recipeBookmarkDetails = {
        title: recipe.title,
        url: recipe.sourceUrl,
      };
      link.addEventListener("click", () =>
        displayRecipeModal(recipeBookmarkDetails)
      );

      recipeCard.appendChild(title);
      recipeCard.appendChild(image);
      // recipeCard.appendChild(description);
      recipeCard.appendChild(link);
      resultsContainer.appendChild(recipeCard);
    }
  }

  function displayRecipeModal(recipe) {
    document.querySelector("#recipe-modal").style.display = "block";
    document.querySelector("#iframe").style.display = "none";
    document.querySelector("#modal-recipe-instructions").style.display =
      "block";
    document.querySelector("#modal-title").innerText = recipe.title;
    //issue?
    const recipeURL = `https://api.spoonacular.com/recipes/extract?apiKey=${spoonacularApiKey}&url=${recipe.url}&analyze=true`;
    fetch(recipeURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (recipeData) {
        if (!recipeData.instructions) {
          document.querySelector("#modal-recipe-instructions").innerText =
            "ERROR: Unable to extract recipe. Visit " +
            recipeData.sourceUrl +
            " for complete instructions.";
        } else {
          document.querySelector("#modal-recipe-instructions").innerHTML =
            recipeData.instructions;
        }
      });
    function removableRecipeSave() {
      recipeSave(recipe);
    }
    const recipeBookmark = document.querySelector("#save-recipe");
    recipeBookmark.addEventListener("click", removableRecipeSave);
    const closeButton = document.querySelector("#close-modal");
    closeButton.addEventListener("click", () => {
      document.querySelector("#recipe-modal").style.display = "none";
      recipeBookmark.removeEventListener("click", removableRecipeSave);
    });
  }
  function recipeSave(recipe) {
    if (recipeBookmarks[recipe.url]) {
      // change bookmark button
      // remove from obj
      // localStorage.setItem("youtubeBookmarks", JSON.stringify(youtubeBookmarks));
      // document.getElementById("${video.id}")
      // delete item
      return;
    }
    recipeBookmarks[recipe.url] = recipe.title;
    localStorage.setItem("recipeBookmarks", JSON.stringify(recipeBookmarks));
    const dropdownRecipe = document.createElement("p");
    dropdownRecipe.classList.add(
      "youtube-link",
      "block",
      "px-4",
      "py-2",
      "mt-2",
      "text-sm",
      "font-semibold",
      "bg-transparent",
      "rounded-lg",
      "md:mt-0",
      "hover:text-gray-900",
      "focus:text-gray-900",
      "hover:bg-gray-200",
      "focus:bg-gray-200",
      "focus:outline-none",
      "focus:shadow-outline"
    );
    const recipeObj = JSON.parse(localStorage.getItem("recipeBookmarks"));
    dropdownRecipe.innerText = recipeObj[recipe.url];
    dropdownRecipe.id = recipe.url;
    document.querySelector(".recipe-bookmarks").appendChild(dropdownRecipe);
    dropdownRecipe.addEventListener("click", () => displayRecipeModal(recipe));
  }

  // Function to search for YouTube videos
  async function searchVideos(query) {
    query = query + " food " + "recipe";

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${query}&key=${youtubeApiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.items;
  }

  // Function to display video results
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

      const vidBookmarkDetails = {
        title: video.snippet.title,
        id: video.id.videoId,
      };

      videoLink.addEventListener("click", () =>
        displayVideoModal(vidBookmarkDetails)
      );

      videoCard.appendChild(title);
      videoCard.appendChild(thumbnail);
      videoCard.appendChild(videoLink);
      videoResultsContainer.appendChild(videoCard);
    });
  }
  function displayVideoModal(video) {
    document.querySelector("#recipe-modal").style.display = "block";
    document.querySelector("#modal-title").innerText = video.title;
    document.querySelector("#modal-recipe-instructions").style.display = "none";
    document.querySelector("#iframe").style.display = "block";
    document.querySelector(
      "#iframe"
    ).src = `https://www.youtube.com/embed/${video.id}`;
    const videoBookmark = document.querySelector("#save-recipe");
    function removableVideoSave() {
      videoSave(video);
    }
    videoBookmark.addEventListener("click", removableVideoSave);
    const closeButton = document.querySelector("#close-modal");
    closeButton.addEventListener("click", () => {
      document.querySelector("#recipe-modal").style.display = "none";
      videoBookmark.removeEventListener("click", removableVideoSave);
    });
  }

  function videoSave(video) {
    if (youtubeBookmarks[video.id]) {
      // change bookmark button
      // remove from obj
      // localStorage.setItem("youtubeBookmarks", JSON.stringify(youtubeBookmarks));
      // document.getElementById("${video.id}")
      // delete item
      return;
    }
    youtubeBookmarks[video.id] = video.title;
    localStorage.setItem("youtubeBookmarks", JSON.stringify(youtubeBookmarks));
    const dropdownYoutube = document.createElement("p");
    dropdownYoutube.classList.add(
      "youtube-link",
      "block",
      "px-4",
      "py-2",
      "mt-2",
      "text-sm",
      "font-semibold",
      "bg-transparent",
      "rounded-lg",
      "md:mt-0",
      "hover:text-gray-900",
      "focus:text-gray-900",
      "hover:bg-gray-200",
      "focus:bg-gray-200",
      "focus:outline-none",
      "focus:shadow-outline"
    );
    const youtubeObj = JSON.parse(localStorage.getItem("youtubeBookmarks"));
    dropdownYoutube.innerText = youtubeObj[video.id];
    dropdownYoutube.id = video.id;
    document.querySelector(".youtube-bookmarks").appendChild(dropdownYoutube);
    dropdownYoutube.addEventListener("click", () => displayVideoModal(video));
  }

  // Event listener for videos button
  const videosButton = document.getElementById("videos-button");
  videosButton.addEventListener("click", async () => {
    const searchInput = document.getElementById("search-input");

    if (query) {
      const videos = await searchVideos(query);
      displayVideos(videos);
    }
  });
  // Event listener for search button
  const searchButton = document.getElementById("search-button");
  searchButton.addEventListener("click", async () => {
    const searchInput = document.getElementById("myInput");
    query = searchInput.value;
    if (query) {
      const recipes = await searchRecipes(query);
      displayRecipesWithDetails(recipes);
    }
  });
});

/* APIs
Rojan's API key: fbea9de7dc21482db3eff5c3ba63e63b
(500 calls a month for Youtube and 3,000 for spoonacular)*/

/* APIs
Rojan's spoonacular API key: 3508c499e2844bffb6e689336e37581e
Matt's spoonacular API key:  e2ebf5f91be9ed84ff7b3315f93cff5d
Matt's YouTube API key:  AIzaSyCWp4wXg1lqxDk9sfVm91BMkBfeDTnfaIU
*/
