// Click Enter Search
const btnSearch = document.getElementById("btn-search");
const searchText = document.getElementById("search-field");

searchText.addEventListener("keypress", function (event) {
    // event.preventDefault();
    if (event.key == "Enter")
        btnSearch.click();
});


let error = document.getElementById('error-msg');
let mealDetail = document.getElementById('meal-details');

function searchFood() {
    let searchField = document.getElementById('search-field');
    let searchText = searchField.value;



    if (searchText == '') {
        let searchResults = document.getElementById('search-results');

        // clear previous value in the result section
        searchResults.textContent = '';
        error.innerText = "Please write any meal name.";

    } else {
        // Load Data
        let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
        // Clear data
        searchField.value = "";
        error.innerText = "";
        // Fetch with API
        fetch(url)
            .then(res => res.json())
            .then(data => displayFood(data));
    }




}

let displayFood = foods => {
    // console.log(foods);
    let searchResults = document.getElementById('search-results');

    // clear previous value in the result section
    searchResults.textContent = '';
    if (foods.meals == null) {
        error.innerText = "No result found.";
    } else {
        // clear previous data
        mealDetail.textContent = "";
        error.innerText = "";
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


}


const mealDetails = async mealId => {
    let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    let res = await fetch(url);
    let data = await res.json();
    displayMeal(data);
    // fetch(url)
    //     .then(res => res.json())
    //     .then(data => displayMeal(data));
}




let displayMeal = meal => {
    // console.log(meal.meals[0]);
    let food = (meal.meals[0]);


    // clear previous data
    mealDetail.textContent = "";

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