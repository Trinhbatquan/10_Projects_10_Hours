const mealsEl = document.getElementById("meals");
const favoriteContainer = document.getElementById("fav-container-list");
const searchAll = document.getElementById("searchAll");
const search = document.getElementById("search");

//showInfo
const showInfoOverlay = document.getElementById("showInfo-overlay");
// const showInfoContainer = document.getElementById('showInfo-container');
const showInfoContainerBtn = document.getElementById("showInfo-container-btn");

loadData();
async function loadData() {
  await fetchFavMeals();
  await getRandomMeal();
}

async function getRandomMeal() {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  const respData = await resp.json();
  const randomMeal = respData.meals[0];

  addMeal(randomMeal, true);
}

async function getMealById(id) {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
  );

  const respData = await resp.json();
  const meal = respData.meals[0];

  return meal;
}

async function getMealsBySearch(term) {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
  );

  const respData = await resp.json();
  const meals = respData.meals; //array gom nhieu object

  return meals;
}

function addMeal(mealData, random = false) {
  // console.log(mealData);
  mealsEl.innerHTML = "";
  const meal = document.createElement("div");
  meal.classList.add("meal");

  meal.innerHTML = `
        <div class="meal-header">
            ${
              random
                ? `
            <span class="random"> Random Recipe </span>`
                : ""
            }
            <img
                src="${mealData.strMealThumb}"
                alt="${mealData.strMeal}"
            />
        </div>
        <div class="meal_body">
            <h4>${mealData.strMeal}</h4>
            <button class="fav-btn">
                <i class="fas fa-heart"></i>
            </button>
        </div>
    `;

  const btn = meal.querySelector(".meal_body .fav-btn");
  const img = meal.querySelector(".meal-header img");


  btn.addEventListener("click", () => {
    // if (btn.classList.contains("active")) {
    // removeMealLS(mealData.idMeal);
    // btn.classList.remove("active");
    // } else {
    addMealLS(mealData.idMeal);
    btn.classList.add("active");
    // }

    fetchFavMealsNoLoaded(mealData.idMeal);
    const checkMeals = document.getElementById("meals");
    const checkMealsChild = document.querySelectorAll(".meal");
    if (checkMealsChild.length > 1) {
      btn.parentElement.parentElement.remove();
    } else {
      getRandomMeal();
    }
  });

  img.addEventListener("click", () => {
    console.log(mealData);
    showInfoContainer(mealData);
  });

  mealsEl.appendChild(meal);
}

function addMealNoLoader(mealData, random = false) {
  // console.log(mealData);
  // mealsEl.innerHTML = "";
  const meal = document.createElement("div");
  meal.classList.add("meal");

  meal.innerHTML = `
        <div class="meal-header">
            ${
              random
                ? `
            <span class="random"> Random Recipe </span>`
                : ""
            }
            <img
                src="${mealData.strMealThumb}"
                alt="${mealData.strMeal}"
            />
        </div>
        <div class="meal_body">
            <h4>${mealData.strMeal}</h4>
            <button class="fav-btn">
                <i class="fas fa-heart"></i>
            </button>
        </div>
    `;

  const btn = meal.querySelector(".meal_body .fav-btn");
  const img = meal.querySelector(".meal-header img");

  btn.addEventListener("click", () => {
    // if (btn.classList.contains("active")) {
    // removeMealLS(mealData.idMeal);
    // btn.classList.remove("active");
    // } else {
    addMealLS(mealData.idMeal);
    btn.classList.add("active");
    // }

    fetchFavMealsNoLoaded(mealData.idMeal);
    btn.parentElement.parentElement.remove();
  });

  img.addEventListener("click", () => {
    console.log(mealData);
    showInfoContainer(mealData);
  });

  mealsEl.appendChild(meal);
}

function addMealLS(mealId) {
  const mealIds = getMealsLS();

  localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
}

function removeMealLS(mealId) {
  const mealIds = getMealsLS();

  localStorage.setItem(
    "mealIds",
    JSON.stringify(mealIds.filter((id) => id !== mealId))
  );
}

function getMealsLS() {
  const mealIds = JSON.parse(localStorage.getItem("mealIds"));

  return mealIds === null ? [] : mealIds;
}

async function fetchFavMeals() {
  // clean the container
  favoriteContainer.innerHTML = "";

  const mealIds = getMealsLS();

  for (let i = 0; i < mealIds.length; i++) {
    const mealId = mealIds[i];
    meal = await getMealById(mealId);

    addMealFav(meal);
  }
}

async function fetchFavMealsNoLoaded(id) {
  const meal = await getMealById(id);
  addMealFav(meal);
}

function addMealFav(mealData) {
  const favMeal = document.createElement("li");

  favMeal.innerHTML = `
        <img
            src="${mealData.strMealThumb}"
            alt="${mealData.strMeal}"
        />
        <span>${mealData.strMeal}</span>
        <button class="clear"><i class="fas fa-window-close"></i></button>
    `;

  const btn = favMeal.querySelector(".clear");
  const img = favMeal.querySelector("img");
  const span = favMeal.querySelector("span");
  // console.log(btn);
  // btn.addEventListener("click", (e) => {
  //     removeMealLS(mealData.idMeal);
  //     console.log(btn.parentElement);
  // });
  // btn.forEach((child) => {
  //   btn
  // })

  // console.log(btn);

  btn.addEventListener("click", () => {
    removeMealLS(mealData.idMeal);
    btn.parentElement.remove();
  });

  img.addEventListener("click", () => {
      showInfoContainer(mealData);
  });
  span.addEventListener("click", () => {
    showInfoContainer(mealData);
});

  favoriteContainer.appendChild(favMeal);
}

//search
search.addEventListener("click", async () => {
  let valueMeals = searchAll.value;
  if (valueMeals) {
  const mealsSearch = await getMealsBySearch(valueMeals);
  for (var i = 0; i < mealsSearch.length; i++) {
    addMealNoLoader(mealsSearch[i]);
  }
} else {
    alert("No data about your disk. Please fill another disk.");
}
searchAll.value = "";
});

function showInfoContainer(mealData) {
  showInfoOverlay.innerHTML = "";
  console.log(showInfoOverlay);
  showInfoOverlay.classList.remove('hidden');
  const showInfoContainer = document.createElement("div");
  showInfoContainer.classList.add('showInfo-container')
  const strIngredientArr = [];
  for (var i = 1; i <= 20; i++) {
    if (mealData['strIngredient' + i]) {
        strIngredientArr.push(
            `${mealData['strIngredient'+i]} / ${mealData['strMeasure'+i]}`
        );
    } else {
        break;
    }
  }
  console.log(strIngredientArr);
  showInfoContainer.innerHTML = `
        <button class="showInfo-container-btn" id="showInfo-container-btn">
            <i class="fa-solid fa-xmark"></i>
        </button>
        <h1>${mealData.strMeal}</h1>
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
        <p> ${mealData.strInstructions}
        </p>
        <h3>Ingredient:</h3>
        <ul>
            ${strIngredientArr.map((element) => {
               return `<li>${element} </li>`
            }).join("")}
        </ul>`;

        //phai note cai nay

    const showInfoBtn = showInfoContainer.querySelector('.showInfo-container-btn');
    console.log(showInfoBtn);
    showInfoBtn.addEventListener('click', () => {
        showInfoBtn.parentElement.parentElement.classList.add('hidden');
    })

    showInfoOverlay.appendChild(showInfoContainer);
}
