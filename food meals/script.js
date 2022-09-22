// variables
const searchBtn = document.getElementById("search-btn");
const mealContainer = document.getElementById("meal-container");

// actions
searchBtn.addEventListener("click", findMeal);

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
          mealContainer.innerHTML = html ? html : "loading...";
        } else {
          mealContainer.innerHTML = "Sorry, not found";
        }
      });
  }
}
