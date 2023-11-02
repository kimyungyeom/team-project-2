// 영화 카드 하나하나 그려주는 funtion
export async function draw(moviesData) {
  const posterBox = document.querySelector(".posterBox");
  moviesData.forEach((movie) => {
    const movieId = movie.id;
    const movieTitle = movie.title;
    const movieImg = movie.backdrop_path;
    let addhtml = `
    <div class="poster" data-id=${movie.id}>
        <div class="card bg-dark text-white">
            <div class="movieId">${movieId}</div>
            <img src="https://image.tmdb.org/t/p/w1280${movieImg}" class="card-img posterImg" alt="movie poster image" />
            <div class="card-img-overlay posterContentsBox">
            <h5 class="card-title title">${movieTitle}</h5>
                <div class="contentWrap">
                <button class="btn btn-warning detailBtn" type="button" style="display: none" >더보기</button>
                </div>
            </div>
        </div>
    </div>
    `;
    posterBox.innerHTML += addhtml;
  });
  AddClicklistener();
}

// 상세페이지 이동 url 아이디값 넣어줌
function AddClicklistener() {
  const poster = document.getElementsByClassName("poster");
  const detailBtn = document.getElementsByClassName("detailBtn");
  for (let i = 0; i < poster.length; i++) {
    poster[i].addEventListener("click", (e) => {
      const movie = poster[i];
      const movieId = movie.dataset.id;
      location.href = `detail.html?${movieId}`;
      console.log(movieId);
    });
    poster[i].addEventListener("mouseenter", (e) => {
      detailBtn[i].style.display = "block";
    });
    poster[i].addEventListener("mouseleave", (e) => {
      detailBtn[i].style.display = "none";
    });
  }
}
