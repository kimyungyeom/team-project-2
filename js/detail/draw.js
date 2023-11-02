const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MDUyZDk1YTU1NzM4OTZhOWUyZTRkMDZiYmFjZDkzYSIsInN1YiI6IjY1MmY2NDQ5MGNiMzM1MTZmNjQwYjlkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.V-gAyCfvw8yM8Ll7BDo1DEs9CS7vxzStmFhGra5s61g",
  },
};

let temp = location.href.split("?");
// console.log(temp);
const movieId = temp[1];
const panel = document.querySelector(".panel");
const commentWrap = document.querySelector(".commentWrap");

// getIdFunc() -> drawDetailFunc() 변경
drawDetailFunc();

// 댓글 함수 실행
drawCommentFunc();

// 상세페이지 그려주는 함수
async function drawDetailFunc() {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=ko`,
    options
  );
  // console.log(response);
  // console.log(response); // Response {type: 'cors', url: 'https://api.themoviedb.org/3/movie/top_rated?language=ko&page=1', redirected: false, status: 200, ok: true, …}
  // json(클라이언트와 서버 간의 HTTP 통신 위한 텍스트 데이터 포맷)으로 표기
  const movieData = await response.json();
  console.log(movieData);

  const movieImgSrc = movieData.backdrop_path;
  const movieTitle = movieData.title;
  const movieRating = movieData.vote_average;
  const movieReleaseDate = movieData.release_date;
  const movieOverview = movieData.overview;

  let addhtml = `
  <div class="panel-cover">
      <img
        class="panel-cover-src"
        src="https://image.tmdb.org/t/p/w1280/${movieImgSrc}"
        alt=""
      />
    </div>
    <div class="panel-main">
      <div class="panel-contents" style="display: block">
          <h1 class="panel-title">${movieTitle}</h1>
          <div class="panel-info">  
            <h4 class="panel-vote_average"><i class="starIc fa-solid fa-star star"></i>${movieRating}</h4>
            <h4 class="panel-release_date"><i class="calendar fa-solid fa-calendar-days"></i>${movieReleaseDate}</h4>
          </div> 
        <div>
          <h3  class="panel-tagline">${movieData.tagline}</h3>
          <p>
          ${movieOverview}
          </p>
        </div>
        <div id="commentBtn" class="panel-btn commentCount">
          <i class="coBtn fa-solid fa-comment"></i>
        </div>
        <div class = "back-btn">
        <span class="material-symbols-outlined" id="detail-backBtn">
          arrow_circle_left
          </span>
        </div>
        <div>
        </div>
      </div>
    </div>
      `;
  panel.innerHTML += addhtml;

  // const sectionWrap = document.querySelector(".sectionWrap");
  const commentBtn = document.getElementById("commentBtn");
  console.log(commentBtn);
  const coSection = document.querySelector(".coSection");
  const detailbackBtn = document.getElementById("detail-backBtn");
  detailbackBtn.addEventListener("click", (e) => {
    window.history.back();
  });
  //
  commentBtn.addEventListener("click", (e) => {
    e.preventDefault;

    if (coSection.style.display === "none") {
      coSection.style.display = "flex";
      // sectionWrap.classList.remove("vh");
    } else {
      coSection.style.display = "none";
      // sectionWrap.classList.add("vh");
    }
  });
}

// 리뷰 그려주는 함수
async function drawCommentFunc() {
  // 댓글
  let commentAddHtml = `
 
    <div class="comments">
      <div class="movieId">${movieId}</div>
      
      <div class="commentCount">
        <i class="fa-solid fa-comment"></i><h7> <span></span></h7>
      </div>

      <div id="CommentList" class="commentBox"></div>

      <div class="commentInputBox">
        <form id="CommentForm">
         <div class="commentSignupBox">
            <p class="commentUser">
            <input
            type="text"
            placeholder="이름을 입력해주세요"
            id="username"
            />
            </p>
            <p class="comment">
              <input type="password" class="review" placeholder="비밀번호를 입력해주세요" id="password" />
            </p>
            <p class="comment">
              <textarea class="review" id="comment" name="review" rows="1" cols="33" placeholder="한줄평을 작성해주세요"></textarea>
            </p>
         </div>
          <button class="btn btn-warning coSubmitBtn" type="submit">
            등록
          </button>
        </form>
      </div>
    </div>
 
  `;

  commentWrap.innerHTML += commentAddHtml;
}
