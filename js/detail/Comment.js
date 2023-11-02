const COMMENTFORM = document.getElementById("CommentForm");
const COMMENTLIST = document.getElementById("CommentList");
const COMMENTTOTAL = document.querySelector("h7 > span");
const MOVIEID = GetMovieId();

// 페이지 로드시에 아래 함수 실행
window.onload = function () {
  // 화면에 댓글 표시
  DisplayComments();
  // 총 댓글 수 표시
  Total();
};

COMMENTFORM.addEventListener("submit", WriteComment);

// 댓글 작성하기
function WriteComment(event) {
  event.preventDefault();

  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let comment = document.getElementById("comment").value;
  console.log(typeof comment);

  // 빈값 데이터 유효성검사
  if (username === "" || password === "" || comment === "") {
    alert("이름, 비밀번호, 리뷰중 빈곳이 있습니다.");
    return;
  }

  // 작성일자
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let date = today.getDate();
  let dateWritten = year + "-" + month + "-" + date;

  let comments = GetCommentFromMovieID(MOVIEID);
  comments.push({ username, password, comment, dateWritten });
  SetCommentFromMovieID(MOVIEID, comments);
  // 입력내용 비우기
  COMMENTFORM.reset();
  DisplayComments();
  Total();
}

// 댓글 삭제하기
function DeleteComment(index) {
  let comments = GetCommentFromMovieID(MOVIEID);

  // 유저로부터 입력값을 받을수 있고 문구를 띄운다.
  let password = prompt("비밀번호를 입력해주세요.");

  // 비밀번호 일치여부 체크
  let checkpassword = comments[index].password === password;

  if (checkpassword) {
    // 해당하는 댓글을 삭제한다.
    comments.splice(index, 1);
    SetCommentFromMovieID(MOVIEID, comments);
    DisplayComments();
    Total();
  } else {
    alert("비밀번호를 확인해주세요.");
  }
}

// 댓글 수정하기
function EditComment(index) {
  let comments = GetCommentFromMovieID(MOVIEID);

  // 유저로부터 입력값을 받을수 있고 문구를 띄운다.
  let password = prompt("비밀번호를 입력해주세요.");

  // 비밀번호 일치여부 체크
  let checkpassword = comments[index].password === password;

  if (checkpassword) {
    let editcomment = prompt("새 댓글 내용을 입력해주세요.");
    // 빈값 데이터 유효성 검사
    if (editcomment === "") {
      alert("공백을 입력할 수 없습니다.");
      return;
    }

    // 취소를 누를시에 기존 댓글 유지
    if (editcomment === null) {
      alert("수정을 취소합니다.");
      return;
    }

    //  댓글 내용 수정
    comments[index].comment = editcomment;

    SetCommentFromMovieID(MOVIEID, comments);
    DisplayComments();
    Total();
  } else {
    alert("비밀번호를 확인해주세요.");
  }
}

// 댓글 표시하기
function DisplayComments() {
  COMMENTLIST.innerHTML = "";
  let comments = GetCommentFromMovieID(MOVIEID);

  comments.forEach((element, index) => {
    let comment_element = document.createElement("div");
    comment_element.innerHTML = `
                <div class="commentBoxWrap">
                    <div class="reviewWrap">
                        <p class="commentUser">${element.username}</p>
                        <p class="comment">${element.comment}</p>
                        <span class="commentDate"> 작성일자 : ${element.dateWritten} </span>
                    </div>
                    <div class="commentBtnWrap">
                        <button id="Del_btn" class="btn btn-warning Del_btn" type="button" onclick="DeleteComment(${index})">삭제</button>
                        <button id="Edit_btn" class="btn btn-warning Edit_btn" type="button" onclick="EditComment(${index})">수정</button>
                    </div>
                </div>
                `;

    COMMENTLIST.appendChild(comment_element);
  });
}

// 총 댓글 수 표시하기
function Total() {
  let comments = GetCommentFromMovieID(MOVIEID);
  COMMENTTOTAL.innerText = comments.length;
}

// 영화 id 추출하기
function GetMovieId() {
  let temp = location.href.split("?");
  let movieId = temp[1];
  return movieId;
}

// 영화 id를 기반으로 해당 영화 댓글 가져오기
function GetCommentFromMovieID(MOVIEID) {
  // 해당하는 영화 localStorage에 빈배열 생성
  if (localStorage.getItem(`${MOVIEID}`) === null) {
    localStorage.setItem(`${MOVIEID}`, JSON.stringify([]));
  }

  return JSON.parse(localStorage.getItem(`${MOVIEID}`));
}

// 해당 영화id localStorage에 댓글 저장하기
function SetCommentFromMovieID(MOVIEID, comments) {
  localStorage.setItem(`${MOVIEID}`, JSON.stringify(comments));
}
