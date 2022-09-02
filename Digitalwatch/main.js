const hourField = document.getElementById("hour");
const minuteField = document.getElementById("minute");
const secondField = document.getElementById("second");
const sessionField = document.getElementById("session");
const dateField = document.getElementById("date");

const secArm = document.getElementById("sec");
const minArm = document.getElementById("min");
const hrArm = document.getElementById("hr");

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Call func
displayTime();
displayDate();
wallClockFun();

function displayTime() {
  const time = new Date();
  // time variables
  let h = time.getHours(); // 0 - 23
  let m = time.getMinutes(); // 0 - 59
  let s = time.getSeconds(); // 0 - 59
  let session;

  // hours logic
  h >= 12 ? (session = "PM") : (session = "AM");
  h > 12 ? (h = h - 12) : (h = h);
  h < 10 ? (h = "0" + h) : (h = h);
  hourField.innerHTML = h;
  sessionField.innerHTML = session;

  // minutes logic
  m < 10 ? (m = "0" + m) : (m = m);
  minuteField.innerHTML = m;

  // seconds logic
  s < 10 ? (s = "0" + s) : (s = s);
  secondField.innerHTML = s;

  // repeat function
  setTimeout(displayTime, 1000);
}

function displayDate() {
  const currDate = new Date();

  // date variables
  let today = days[currDate.getDay()];
  let dayOfMonth = currDate.getDate();
  let month = months[currDate.getMonth()];
  let year = currDate.getFullYear();

  let ordinal = "th";

  if ([1, 21, 31].includes(dayOfMonth)) {
    ordinal = "st";
  }
  if ([2, 22].includes(dayOfMonth)) {
    ordinal = "nd";
  }
  if ([3, 23].includes(dayOfMonth)) {
    ordinal = "rd";
  }

  dateField.innerHTML = `${today}, ${dayOfMonth}${ordinal} ${month} ${year}`;
}

function wallClockFun() {
  const time = new Date();

  // calculate rotation degree
  let secRotate = time.getSeconds() * 6;
  let minRotate = time.getMinutes() * 6 + time.getSeconds() * 0.1;
  let hrRotate = time.getHours() * 30 + time.getMinutes() * 0.5;

  secArm.style.transform = `rotate(${secRotate}deg)`;
  minArm.style.transform = `rotate(${minRotate}deg)`;
  hrArm.style.transform = `rotate(${hrRotate}deg)`;

  setTimeout(wallClockFun, 1000);
}
