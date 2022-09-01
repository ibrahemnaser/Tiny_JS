const btns = document.querySelectorAll("button");
const toastTxt = document.querySelector(".toast-text");
const sec = document.getElementById("sec");
const mSec = document.getElementById("msec");

let timerWatch;
let timerToast;
let seconds = 0;
let millSeconds = 0;

btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let action = e.target.dataset.action.toLowerCase();

    // stop watch functionality
    handleAction(action);

    // toast functionality
    clearTimeout(timerToast);
    handleToast(action);
  });
});

// handle toast
function handleToast(action) {
  toastTxt.innerHTML = action;
  toastTxt.parentElement.classList.remove("-left-24");
  toastTxt.parentElement.classList.add("left-4");
  timerToast = setTimeout(() => {
    toastTxt.parentElement.classList.remove("left-4");
    toastTxt.parentElement.classList.add("-left-24");
  }, 1000);
}

// Interval function
function startTime() {
  timerWatch = setInterval(() => {
    millSeconds++;
    if (millSeconds < 10) {
      mSec.innerHTML = "0" + millSeconds;
    }
    if (millSeconds >= 10) {
      mSec.innerHTML = millSeconds;
    }
    if (millSeconds >= 100) {
      seconds++;
      millSeconds = 0;
      mSec.innerHTML = "00";
    }
    if (seconds < 10) {
      sec.innerHTML = "0" + seconds;
    }
    if (seconds >= 10) {
      sec.innerHTML = seconds;
    }
  }, 10);
}

// Action handeling
function handleAction(action) {
  switch (action) {
    case "start":
      clearInterval(timerWatch);
      startTime();
      break;
    case "stop":
      clearInterval(timerWatch);
      break;
    case "reset":
      clearInterval(timerWatch);
      seconds = 0;
      millSeconds = 0;
      sec.innerHTML = "00";
      mSec.innerHTML = "00";
      break;
  }
}
