const loadMeals = (search) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
  // console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMeals(data.meals));
};

const displayMeals = (meals) => {
  // console.log(meals);
  const mealsContainer = document.getElementById("meals-container");
  mealsContainer.innerHTML = "";
  meals.forEach((meal) => {
    // console.log(meal);
    const mealsDiv = document.createElement("div");
    mealsDiv.classList.add("col");
    mealsDiv.innerHTML = `
    <div class="card">
    <img src="${meal.strMealThumb}" class="card-img-top" alt="..." />
    <div class="card-body">
      <h1>${meal.strTags}</h1>
      <h3>${meal.strCategory}</h3>
      <h5 class="card-title">${meal.strMeal}</h5>
      <p class="card-text">
        ${meal.strInstructions.slice(0, 200)}
      </p>
      <button onclick="loadMealsDetails('${
        meal.idMeal
      }')" class="btn btn-success text-white">Details</button>
    </div>
  </div>
    `;
    mealsContainer.appendChild(mealsDiv);
  });
};

const searchMeals = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  // console.log(searchText);
  loadMeals(searchText);
  searchField.value = "";
};

const loadMealsDetails = (idMeal) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
  // console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMealDetails(data.meals[0]));
};

const displayMealDetails = (meal) => {
  // console.log(meal);
  const mealsDetails = document.getElementById("meals-details");
  mealsDetails.innerHTML = "";
  const mealsDiv = document.createElement("div");
  mealsDiv.classList.add("card");
  mealsDiv.innerHTML = `
  <img src="${meal.strMealThumb}" class="card-img-top" alt="..." />
  <div class="card-body">
  <h1>${meal.strTags}</h1>
  <h3>${meal.strCategory}</h3>
  <h5 class="card-title">${meal.strMeal}</h5>
  <p class="card-text">
    ${meal.strInstructions.slice(0, 200)}
  </p>
    <a href="${meal.strYoutube}" class="btn btn-success">Youtube</a>
  </div>
  `;
  mealsDetails.appendChild(mealsDiv);
};

loadMeals("fish");
