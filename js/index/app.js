import { draw } from "./draw.js";
import { options } from "../API_KEY.js";

async function showMovie(category, count) {
  // 별점순 영화 데이터 20개 가져오기
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${category}?language=ko&page=${count}`,
    options
  );
  // Response {type: 'cors', url: 'https://api.themoviedb.org/3/movie/top_rated?language=ko&page=1', redirected: false, status: 200, ok: true, …}
  // json(클라이언트와 서버 간의 HTTP 통신 위한 텍스트 데이터 포맷)으로 표기
  const jsonData = await response.json();
  // jsonData 안에 results 키값이 우리가 원하는 영화 데이터니까 moviesData 변수로 지정
  const moviesData = await jsonData.results;

  // 영화 카드 그려주기
  draw(moviesData);
}

async function clickViewBtn() {
  const viewBtn = document.querySelector(".viewMoreBtn");
  viewBtn.addEventListener("click", function viewBtnClick(e) {
    e.preventDefault();
    count++;
    console.log(count);
    showMovie(category, count);
    if (count === 5) {
      viewBtn.style.display = "none";
      return;
    }
  });
}

function PopularityButton() {
  const popularBtn = document.getElementById("popularBtn");
  popularBtn.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".viewMoreBtn").style.display = "block";
    document.querySelector(".posterBox").innerHTML = "";
    category = "popular";
    count = 1;
    showMovie(category, count);
  });
}
function RatingButton() {
  const popularBtn = document.getElementById("ratingBtn");
  popularBtn.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".viewMoreBtn").style.display = "block";
    document.querySelector(".posterBox").innerHTML = "";
    category = "top_rated";
    count = 1;
    showMovie(category, count);
  });
}
// 페이지 수(초기값)
let count = 1;
let category = "top_rated";

showMovie(category, count);
clickViewBtn();
PopularityButton();
RatingButton();
