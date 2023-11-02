import { draw } from "./index/draw.js";
import { options } from "./API_KEY.js";

// Search
async function SearchMovie() {
  const searchMoreBtn = document.getElementById("searchMoreBtn");
  const posterBox = document.querySelector(".posterBox");
  const searchInput = document.getElementById("searchInput");
  let temp = location.href.split("?");

  // get SearchData
  let searchDataCollection = [];
  for (let i = 1; i <= 3; i++) {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?${temp[1]}&include_adult=false&language=ko&page=${i}`,
      options
    );
    const jsonData = await response.json();
    const searchData = jsonData.results;
    searchDataCollection.push(searchData);
  }

  // merge data
  // searchDataCollection push를 했으니 arr[0] = {}*20개 arr[1]= {}*20....
  const mergedDataCollection = [].concat(...searchDataCollection);

  // sort data
  mergedDataCollection.sort((a, b) => b.popularity - a.popularity);
  const filterCollection = mergedDataCollection.filter(
    (a) => a.backdrop_path !== null
  );

  // draw poster
  let start = 0;
  let end = 20;
  let cut = filterCollection.slice(start, end);
  if (cut.length === 0) {
    alert("NO Search Results");
    return;
  } else if (cut.length < 20) {
    posterBox.innerHTML = "";
    draw(cut);
    searchMoreBtn.style.display = "none";
  } else if (cut.length === 20) {
    posterBox.innerHTML = "";
    searchMoreBtn.style.display = "block";
    draw(cut);
  }

  searchMoreBtn.addEventListener("click", function () {
    start += 20;
    end += 20;
    let ccut = filterCollection.slice(start, end);
    if (ccut.length < 20) {
      draw(ccut);
      searchMoreBtn.style.display = "none";
    } else if (ccut.length === 20) {
      searchMoreBtn.style.display = "block";
      draw(ccut);
    } else if (ccut.length === 0) {
      return;
    }
  });

  searchInput.value = null;
}

// input
async function ClickBtn() {
  const searchBtn = document.getElementById("searchBtn");
  searchBtn.addEventListener("click", () => {
    const inputData = document.querySelector(".searchInput").value;
    if (inputData == "") {
      alert("Please Enter Value");
      return;
    } else if (
      /[!@#$%^&*()_+\-=,.<>/?~`{}]/.test(inputData) ||
      inputData.includes("]") ||
      inputData.includes("[")
    ) {
      alert("No Special Characters");
      return;
    }
    location.href = `search.html?query=${inputData}`;
  });
}

function EnterBtn() {
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const inputData = document.querySelector(".searchInput").value;
      if (inputData == "") {
        alert("Please Enter Value");
        return;
      } else if (
        /[!@#$%^&*()_+\-=,.<>/?~`{}]/.test(inputData) ||
        inputData.includes("]") ||
        inputData.includes("[")
      ) {
        alert("No Special Characters");
        return;
      }
      location.href = `search.html?query=${inputData}`;
    }
  });
}

document.getElementById("searchInput").focus();
ClickBtn();
EnterBtn();
// 현재 url의 파라미터부분을 가져온다
let urlParams = new URLSearchParams(window.location.search);
// 파라미터중  value를 가져온다 ex)?query=asd >>asd부분을 가져온다 이때 query = key  asd = value
let query = urlParams.get("query");
if (query != null) {
  SearchMovie();
}
