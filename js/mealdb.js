function searchFood() {
    let searchField = document.getElementById('search-field');
    let searchText = searchField.value;

    searchField.value = "";

    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;

    // Fetch with API
    fetch(url)
        .then(res => res.json())
        .then(data => displayFood(data));
}

let displayFood = foods => {
    // console.log(foods);
    let searchResults = document.getElementById('search-results');

    for (const food of foods.meals) {
        // console.log(food.strMeal);

        let div = document.createElement('div');
        div.classList.add('col');

        div.innerHTML = `
            <div onclick="mealDetails(${food.idMeal})" class="card">
                <img src="${food.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${food.strMeal}</h5>
                    <p class="card-text">${food.strInstructions.slice(0, 200)}</p>
                </div>
            </div>
        `;

        searchResults.appendChild(div);
    }
}

function mealDetails(mealId) {
    let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMeal(data));
}

let displayMeal = meal => {
    console.log(meal.meals[0]);
    let food = (meal.meals[0]);
    let mealDetail = document.getElementById('meal-details');

    let div = document.createElement('div');
    div.classList.add('card');

    div.innerHTML = `
    <img src="${food.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${food.strMeal}</h5>
            <p class="card-text">${food.strInstructions.slice(0, 100)}</p>
            <a href="${food.strYoutube}" class="btn btn-primary">Go YouTube</a>
        </div>
    `;
    mealDetail.appendChild(div);
}