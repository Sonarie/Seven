var recipeSectionEl = document.querySelector("#recipe-section");

var getRecipeObject = function () {
  
	fetch("https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes", {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "tasty.p.rapidapi.com",
			"x-rapidapi-key": "c932fbbb24mshb43abde3fc25cffp11cacajsnae76ac16d611"
		}
	})
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
    
          createRecipe(data);
        });
      } else {
        alert("Information not found");
      }
    })
    .catch(function (error) {
      alert("Error");
    });
};



getRecipeObject();

// gets the first 20 recipes for a given genre and certification
var createRecipe = function (data, recipeName) {
  console.log("createRecipe is being run");

  for (var i = 0; i < data.results.length; i++) {
    var recipeName = data.results[i].name;
    var recipeUrl = data.results[i].thumbnail_url;
    var instructions = data.results[i].instructions.map((instruction, index) => {
      return (index + 1) + ". " + instruction.display_text;
    });
    var thumbnailUrl = data.results[i].thumbnail_url;
    

// Dom elements

    var recipeBodyEl = document.createElement("div");
    recipeBodyEl.classList = "column is-half";

    var cardContainerEl = document.createElement("div");
    cardContainerEl.className = "card";
    cardContainerEl.setAttribute("id", "card-container");

    var cardEl = document.createElement("div");
    cardEl.className = "card-image";
    cardEl.setAttribute("id", "image-container");

//Thumbnail
    var ImgContEl = document.createElement("figure");
    ImgContEl.classList = "image is-128x128";
    ImgContEl.setAttribute("id", "card-image");

    var posterEl = document.createElement("img");
    posterEl.setAttribute("src", thumbnailUrl);

    ImgContEl.appendChild(posterEl);
    cardEl.appendChild(ImgContEl);
    cardContainerEl.appendChild(cardEl);

// creating title and subtitle
    var cardContentEl = document.createElement("div");
    cardContentEl.setAttribute("id", "content");
    cardContentEl.className = "card-content";

    var cardTitleContEl = document.createElement("div");
    cardTitleContEl.className = "media-content";
    cardTitleContEl.setAttribute("id", "title-sec");

    var titleEl = document.createElement("p");
    titleEl.classList = "title is-4";
    titleEl.textContent = recipeName;

    cardTitleContEl.appendChild(titleEl);

// creating instructions
    var instructionsEl = document.createElement("div");
    instructionsEl.className = "content";
    instructionsEl.innerHTML = instructions.join("<br> <br>");

    cardContentEl.appendChild(cardTitleContEl);
    cardContentEl.appendChild(instructionsEl);

    cardContainerEl.appendChild(cardContentEl);
    recipeBodyEl.appendChild(cardContainerEl);
    recipeSectionEl.appendChild(recipeBodyEl);
    var newLineEl = document.createElement("br");
    recipeSectionEl.appendChild(newLineEl);

// creating select button
    var selectRecipeBtnEl = document.createElement("button");
    selectRecipeBtnEl.textContent = "Select Recipe";
    selectRecipeBtnEl.setAttribute("name", recipeName);
    selectRecipeBtnEl.setAttribute("data-url", recipeUrl);
    selectRecipeBtnEl.classList = "button is-success is-rounded";

    cardContentEl.appendChild(cardTitleContEl);
    cardContentEl.appendChild(selectRecipeBtnEl);
    cardContainerEl.appendChild(cardContentEl);
    recipeBodyEl.appendChild(cardContainerEl);
  }
  
};

// save the recipeName in localStorage
var saveAndGoToYourDate = function(event) {
  recipeName = event.target.name;
  var recipeUrl = event.target.dataset.url;
  // console.log("selected recipe is ",name);

  localStorage.setItem("recipeName", recipeName); 
  localStorage.setItem("recipeUrl", recipeUrl);

  document.location.replace("./date-ready.html")

}

var selectRecipe = document.addEventListener("click", saveAndGoToYourDate);



