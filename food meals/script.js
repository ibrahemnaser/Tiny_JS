// variables
const searchBtn = document.getElementById("search-btn");
const mealContainer = document.getElementById("meal-container");
const recipeModal = document.querySelector(".modal");
const recipeModalClose = document.querySelector(".modal .btn-close");

// actions
searchBtn.addEventListener("click", findMeal);
recipeModalClose.addEventListener("click", () => {
  recipeModal.classList.add("hide");
});

// functions
function findMeal() {
  let html = "";
  const searchMeal = document.getElementById("search-field").value.trim();
  if (searchMeal) {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchMeal}`)
      .then((res) => res.json())
      .then(({ meals }) => {
        if (meals) {
          meals.forEach((meal) => {
            html += `
                    <!-- meal item -->
                        <div class="meal-item" data-id=${meal.idMeal}>
                          <div class="img">
                            <img src=${meal.strMealThumb} alt=${meal.strMeal} />
                          </div>
                          <div class="meal-info">
                            <h4 class="meal-name">${meal.strMeal}</h4>
                            <a class="recipe-btn" href="#">Get Recipe</a>
                          </div>
                        </div>
                    `;
          });
          mealContainer.classList.remove("not-found");
          mealContainer.innerHTML = html ? html : "loading...";
          document.querySelectorAll(".meal-item .recipe-btn").forEach((ele) => {
            ele.addEventListener("click", (e) => {
              e.preventDefault();
              const recipeId =
                e.target.parentElement.parentElement.getAttribute("data-id");
              getRecipeById(recipeId);
            });
          });
        } else {
          mealContainer.classList.add("not-found");
          mealContainer.innerHTML = `
          <h3>Sorry, no meals found!</h3>
          `;
        }
      });
  }
}

function getRecipeById(id) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then(({ meals }) => {
      document.querySelector(".meal-details .meal-details-title").innerHTML =
        meals[0].strMeal;
      document.querySelector(".meal-details .category").innerHTML =
        meals[0].strCategory;
      document.querySelector(".meal-details .meal-instructions p").innerHTML =
        meals[0].strInstructions;
      document.querySelector(
        ".meal-details .meal-img"
      ).innerHTML = `<img src=${meals[0].strMealThumb} alt=${meals[0].strMeal} />`;
      document.querySelector(
        ".meal-details .video"
      ).innerHTML = `<a href=${meals[0].strYoutube} target='_blank'>Watch Video</a>`;

      recipeModal.classList.remove("hide");
    });
}
