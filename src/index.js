import "./style.scss";
import { Server } from "./callServer.js";
import { Global } from "./global.js";


// http://192.168.1.119:8080/?source=QR

let canClick = true;
let name = null;
let email = null;
let mobile = null;
let uniqueCode = null;
let startButtonFlag = true;
let characterinterval = null;

var startButton = document.getElementById("startButtonBg");

let confettiContainer = document.getElementById("confetti-container");

let confettiImages = [
  "./assets/c1.png",
  "./assets/c2.png",
  "./assets/c3.png",
  "./assets/c4.png",
];
let confettiInterval = null;

window.addEventListener("load", () => {
  Global.serverObj = new Server();
  createUser();
  // onload();

  // if (!localStorage.getItem("uid") && !localStorage.getItem("gamekey")) {
  //   createUser();
  // } else {
  //   Global.U_ID = parseInt(localStorage.getItem("uid"));
  //   Global.gameKey = localStorage.getItem("gamekey");
  //   Global.serverObj.setDetails(Global.U_ID, Global.gameKey);
  //   onload();
  // }
});

startButton.addEventListener("click", afterClick.bind(this));

document
  .getElementById("soundIcon")
  .addEventListener("click", toggleSound.bind(this));

document
  .querySelector("#submitButton")
  .addEventListener("click", doRegister.bind(this));
document
  .querySelector("#TickImage_Div")
  .addEventListener("click", tickToggle.bind(this));

document.querySelector("#termsAndConditions").addEventListener("click", () => {
  document.querySelector("#popupIDTH").style.display = "block";
  document.querySelector("#popupIDTH").style.opacity = "1";

  // document.getElementById("popupIDTH").style.transition =
  //   "transform 0.3s ease-in-out";
  // document.getElementById("popupIDTH").style.transform = "scaleY(1)";
});

document.querySelector("#close2").addEventListener("click", () => {
  document.querySelector("#popupIDTH").style.display = "none";
  document.querySelector("#popupIDTH").style.opacity = "0";

  // document.getElementById("popupIDTH").style.transition =
  //   "transform 0.3s ease-in-out";
  // document.getElementById("popupIDTH").style.transform = "scaleY(0)";
});

function onload() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("firstScreen").style.opacity = 1;
  document.getElementById("logo").style.opacity = 1;
  document.getElementById("soundIcon").style.opacity = 1;
  logoAnimation();
  twentyAnimation();

  setTimeout(() => {
    document.getElementById("startButtonBg").style.transition =
      "transform 0.5s ease-in-out";
    document.getElementById("startButtonBg").style.transform = "scale(1)";

    document.getElementById("charcter_Div").style.opacity = 1;

    charcterAnimation();
    setTimeout(() => {
      playPuzzelTextAnimation();
    }, 600);
  }, 2700);
}

function createUser() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let source = urlParams.get("source");
  Global.serverObj.send(
    Global.URL_CREATE,
    setUID.bind(this),
    null,
    {
      // device: Global.isMobile ? "mobile" : "web",
      fresh: true,
      // Country: "Singapore"
      source: source,
    },
    "POST",
    null,
    false
  );
}

function setUID(v) {
  Global.U_ID = v.uid;
  Global.gameKey = v.gamekey;
  // Global.country = JSON.parse(v)["country"];
  Global.serverObj.setDetails(Global.U_ID, Global.gameKey);
  Global.gameID = Global.U_ID;

  // var uIdString = Global.U_ID.toString();
  // localStorage.setItem("uid", uIdString);
  // localStorage.setItem("gamekey", Global.gameKey);
  onload();
}

function afterClick() {
  if (!startButtonFlag) return false;
  startButtonFlag = false;

  Global.serverObj.send(
    Global.URL_VUPDATE,
    null,
    null,
    {
      saveType: "clickUpdater",
      colName: "start_click",
      uniqID: Global.U_ID,
    },
    "POST",
    null,
    false
  );


  setTimeout(() => {

    document.getElementById("startButtonBg").style.transition =
      "transform 0.5s ease-in-out";
    document.getElementById("startButtonBg").style.transform = "scale(0)";

    document.getElementById("firstScreen").style.transition =
      "opacity 0.5s ease-in-out";
    document.getElementById("firstScreen").style.opacity = 0;

    if (window.innerWidth < 470) {
      document.getElementById("logo").style.left = "-7%";
      document.getElementById("logo").style.top = "-3%";
      document.getElementById("logo").style.width = "60vw";
      document.getElementById("logo").style.height = "calc(60vw / 1.74)";
      document.getElementById("logo").style.transition =
        "left 0.5s ease-in-out, width 0.5s ease-in-out, height 0.5s ease-in-out, top 0.5s ease-in-out";
    } else {
      document.getElementById("logo").style.left = "-7%";
      document.getElementById("logo").style.top = "-3%";
      document.getElementById("logo").style.width = "30vh"; //30
      document.getElementById("logo").style.height = "calc(30vh / 1.74)";
      document.getElementById("logo").style.transition =
        "left 0.5s ease-in-out, width 0.5s ease-in-out, height 0.5s ease-in-out , top 0.5s ease-in-out";
    }

    setTimeout(() => {
      clearInterval(characterinterval);
      document.getElementById("formPage").style.opacity = "1";
      document.getElementById("formPage").style.transform =
        " translateY(-55%) scaleY(1)";
      document.getElementById("formPage").style.transition =
        "transform 0.5s ease-in-out";
    }, 800);
  }, 800);
}

function logoAnimation() {
  const sprite = document.getElementById("logo");

  let value = 1;
  var interval = setInterval(() => {
    value += 1; // 100% / 117 frames = 0.8547%
    let value1 = (100 / 117.04) * value;
    if (value >= 117) {
      value = 1;
    }
    sprite.style["background-position"] = `0% ${value1}%`;
  }, 50);
}

function twentyAnimation() {
  const sprite = document.getElementById("twenty_Div");

  let value = 0;
  var interval = setInterval(() => {
    value += 100 / 24; // 100% / 63 frames = 1.5875%
    if (value >= 99) {
      // value = 0;
      clearInterval(interval);
    }
    sprite.style["background-position"] = `0% ${value}%`;
  }, 90);
}

function charcterAnimation() {
  const sprite = document.getElementById("charcter_Div");

  let value = 0;
  characterinterval = setInterval(() => {
    value += 7.688; // 100% / 63 frames = 1.5875%
    if (value >= 99) {
      value = 0;
      // clearInterval(interval);
    }
    sprite.style["background-position"] = `0% ${value}%`;
  }, 100);
}

function playPuzzelTextAnimation() {
  const sprite = document.getElementById("playPuzzle_Div");

  let value = 0;
  var interval1 = setInterval(() => {
    value += 100 / 19; // 100% / 63 frames = 1.5875%
    if (value >= 99) {
      // value = 0;
      clearInterval(interval1);
    }
    sprite.style["background-position"] = `0% ${value}%`;
  }, 80);
}

function doRegister() {
  if (!canClick) return false;

  canClick = false;
  let isValid = validateRegister();

  if (!isValid) {
    canClick = true;
    return false;
  }

  if (isValid) {
    Global.serverObj.send(
      Global.URL_VUPDATE,
      (res) => {
        if (res.code == 403 && res.coupon == "Invalid") {
          copyCode();
          canClick = true;
        }
        if (res.code == 200 && res.coupon == "Valid" && res.prize_name != "") {
          canClick = false;
          showLastPage(res);
        }
      },
      null,
      {
        saveType: "formData",
        name: name,
        email: email,
        mobile: mobile,
        uniqueCode: uniqueCode,
        uniqID: Global.U_ID,
      },
      "POST",
      null,
      false
    );
  }
}

function validateRegister() {
  let isValid = true;

  document.querySelector("#name .error");
  name = document.querySelector("#name").value.trim();
  email = document.querySelector("#email").value.trim();
  mobile = document.querySelector("#mobile").value.trim();
  uniqueCode = document.querySelector("#uniqueCode").value.trim();

  if (name.length == 0) {
    const selector = document.querySelector("#name").parentElement;
    selector.classList.add("error");
    shakeEffect(selector);
    // showError("Enter your name");

    isValid = false;
  } else {
    document.querySelector("#name").parentElement.classList.remove("error");
  }

  if (email.length == 0) {
    const selector = document.querySelector("#email").parentElement;
    selector.classList.add("error");
    shakeEffect(selector);
    // showError("Enter your email");
    isValid = false;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    const selector = document.querySelector("#email").parentElement;
    selector.classList.add("error");
    shakeEffect(selector);

    // showError("Enter a valid email");
    isValid = false;
  } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    document.querySelector("#email").parentElement.classList.remove("error");
  }

  if (mobile.length == 0 || isNaN(mobile)) {
    // document.querySelector("#mobile").parentElement.classList.add("error");

    const selector = document.querySelector("#mobile").parentElement;
    selector.classList.add("error");
    shakeEffect(selector);
    isValid = false;
  } else {
    document.querySelector("#mobile").parentElement.classList.remove("error");
  }


  if (uniqueCode.length == 0) {
    const selector = document.querySelector("#uniqueCode").parentElement;
    selector.classList.add("error");
    shakeEffect(selector);
    isValid = false;
    copyCode();
  }

  if (
    uniqueCode.length === 8 &&
    uniqueCode.startsWith("SD") &&
    /^[A-Z0-9]+$/.test(uniqueCode)
  ) {
    document
      .querySelector("#uniqueCode")
      .parentElement.classList.remove("error");
  } else {
    const selector = document.querySelector("#uniqueCode").parentElement;
    selector.classList.add("error");
    shakeEffect(selector);
    copyCode();

    isValid = false;
  }

  const tickImage = document.getElementById("tickImage");
  if (tickImage.src.includes("t1.png")) {
    isValid = false;

    const selector = document.querySelector("#tickImage").parentElement;
    shakeEffect(selector);
  }

  return isValid;
}

function createConfettiPiece() {
  const confetti = document.createElement("div");
  confetti.classList.add("confetti");

  // Random image
  const img = confettiImages[Math.floor(Math.random() * confettiImages.length)];
  confetti.style.backgroundImage = `url(${img})`;

  // Random position
  confetti.style.left = `${Math.random() * 100}vw`;
  confetti.style.top = `-20px`;

  // Random size
  const size = Math.random() * 20 + 10; // Size between 10px and 30px
  confetti.style.width = `${size}px`;
  confetti.style.height = `${size}px`;

  // Random animation duration and delay
  confetti.style.animationDuration = `${Math.random() * 2 + 2}s`;

  confettiContainer.appendChild(confetti);

  // Remove after animation
  setTimeout(() => {
    confetti.remove();
  }, 5000);
}

function createBalloon() {
  const balloon = document.createElement("div");
  balloon.classList.add("balloon");

  // Random image
  const img = "./assets/baloon.png";
  balloon.style.backgroundImage = `url(${img})`;

  // Random horizontal position
  balloon.style.left = `${Math.random() * 100}vw`;
  balloon.style.bottom = `-40px`; // Start off-screen bottom

  // Random size
  const size = Math.random() * 30 + 30; // Size between 30px and 60px
  balloon.style.width = `${size}px`;
  balloon.style.height = `${size * 1.4}px`; // Slightly taller for balloon shape

  // Random animation duration
  balloon.style.animationDuration = `${Math.random() * 3 + 4}s`; // 4 to 7 sec

  balloonContainer.appendChild(balloon);

  // Remove after animation
  setTimeout(() => {
    balloon.remove();
  }, 8000);
}


function showLastPage(res) {
  // "code": 200,
  // "coupon": "Valid",
  // "prize_name": "HP WH-CH520B",
  // "coupon_code": "SDBBWA4H"

  const prizeName = res.prize_name;
  const couponCode = res.coupon_code;

  document.getElementById(
    "prizeImg"
  ).src = `./assets/prize/${Global.prizeData[prizeName].image}`;
  document.getElementById(
    "prizeText"
  ).innerHTML = `${Global.prizeData[prizeName].prizeText}`;
  document.getElementById("UniqueCodeText").innerText = couponCode;

  setTimeout(() => {
    document.getElementById("formPage").style.transform =
      " translateY(-55%) scaleY(0)";
    document.getElementById("formPage").style.transition =
      "transform 0.5s ease-in-out";

    setTimeout(() => {
      document.getElementById("prizePage").style.opacity = "1";
      document.getElementById("prizePage").style.transition =
        "transform 0.5s ease-in-out";
      document.getElementById("prizePage").style.transform = "scaleY(1)";
      startConfetti();
    }, 1000);
  }, 1000);
}

function startConfetti() {
  confettiInterval = setInterval(() => {
    createConfettiPiece();
  }, 50);

  setInterval(() => {
    if (Math.random() < 0.8) {
      // 30% chance to spawn
      createBalloon();
    }
  }, 1000);
}

function toggleSound() {
  const soundIcon = document
    .getElementById("soundIcon")
    .getElementsByTagName("img")[0];
  if (soundIcon.src.includes("s1.png")) {
    soundIcon.src = "./assets/s2.png";
    document.getElementById("bgMusic").muted = true;
  } else {
    soundIcon.src = "./assets/s1.png";
    document.getElementById("bgMusic").muted = false;
  }
}

function tickToggle() {
  const tickImage = document.getElementById("tickImage");
  if (tickImage.src.includes("t1.png")) {
    tickImage.src = "./assets/t2.png";
  } else {
    tickImage.src = "./assets/t1.png";
  }
}

function shakeEffect(element) {
  element.classList.add("shake");
  setTimeout(() => {
    element.classList.remove("shake");
  }, 400);
}

function showError(message) {
  const popup = document.getElementById("errorPopup");
  popup.textContent = message;
  popup.classList.add("show");

  setTimeout(() => {
    popup.classList.remove("show");
  }, 3000); // hide after 3 seconds
}

function copyCode() {
  const popup = document.getElementById("Popup");

  popup.style.display = "block";
  popup.style.opacity = "1";

  setTimeout(() => {
    popup.style.opacity = "0";
    setTimeout(() => {
      popup.style.display = "none";
    }, 200); // matches transition time
  }, 700);
}

function lastPagePrize() {
  //   Samsung 65Q60 TV
  // Samsung S25 128gb
  // PS5
  // Airwrap
  // V11 vacumm
  // Soundbar 300
  // Apple S10
  // iPad A16
  // HP WH-CH520B
  // Tune520BT
  // E6AF1220K Explore6 Air Fryer
  // SI1009 Steam Iron 1900 W
  // GV
}
