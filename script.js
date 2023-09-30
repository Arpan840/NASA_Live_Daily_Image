const PictureDate = document.querySelector(".picDate");
const image = document.querySelector(".image");
const imageContainer = document.querySelector("#current-image-container");
const title = document.querySelector(".heading");
const description = document.querySelector(".data");
const apiKey = "5DQ3hJKyWl3YKkrMpVYMWUUQhv4xhZPkbE0iVz6b";
let dateInput = document.getElementById("search-input");
const searchButton = document.querySelector("#searchButton");
let date = "";
let dates = [];
let searchHistory = document.querySelector("#search-history");
let previousDate = document.querySelector(".previousDate");

async function getCurrentImageOfTheDay() {
  let response = await fetch(
    `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey} `
  );

  try {
    if (response.ok) {
      let jsonData = await response.json();
      console.log(jsonData);
      PictureDate.innerText = jsonData.date;
      image.innerHTML = `  <img
      class="image"
      src=${jsonData.hdurl}
      alt="Today's Image"
    />`;
      title.innerText = jsonData.title;
      description.innerText = jsonData.explanation;
    } else {
      throw new Error("Data not found");
    }
  } catch (error) {
    console.log(error);
  }
}

function addSearchToHistory() {
  let history = "";
  dates.map(
    (i, index) =>
      (history += `<li class='previousDate' key="${index}" onClick="selectPreviousDate(${index}) ">${i}</li>
			`)
  );
  searchHistory.innerHTML = history;
}
function selectPreviousDate(index) {
  date = dates[index];
}

function saveSearch(data) {
  dates.push(date);
  localStorage.setItem("dates", JSON.stringify(dates));
}
function getImageOfTheDay(e) {
  e.preventDefault();
	selectPreviousDate();
  let selectedDate = dateInput.value;
  date = selectedDate;
  saveSearch(date);
  getCurrentImageOfTheDay();
  addSearchToHistory();
	
}

searchButton.addEventListener("click", getImageOfTheDay);

addEventListener("DOMContentLoaded", getCurrentImageOfTheDay);
