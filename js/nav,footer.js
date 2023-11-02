function logoEffect() {
  const logo = document.querySelector(".logo");
  logo.addEventListener("click", () => {
    window.location.href = "index.html";
  });
  const logoTitleStr = "Collavie";
  const logoTitleWorld = logoTitleStr.split("");

  function strTyping(arr) {
    if (arr.length > 0) {
      logo.innerHTML += arr.shift();
      setTimeout(() => {
        strTyping(arr);
      }, 400);
    }
  }
  strTyping(logoTitleWorld);
}

function footerEffect() {
  const typingName = document.getElementById("move-footer");
  const name = ["김민수", "김윤겸", "최수영", "한승준"];
  const speed = 100;
  let index = 0;

  const typing = async () => {
    const letter = name[index].split("");
    while (letter.length != 0) {
      await wait(speed);
      typingName.innerHTML += letter.shift();
    }

    await wait(800);

    remove();
  };

  const remove = async () => {
    const letter = name[index].split("");

    while (letter.length != 0) {
      await wait(speed);
      letter.pop();
      typingName.innerHTML = letter.join("");
    }
    index = name[index + 1] ? index + 1 : 0;
    typing();
  };
  function wait(ms) {
    return new Promise((res) => setTimeout(res, ms));
  }
  setTimeout(typing, 1500);
}
footerEffect();
logoEffect();
