const daysOfNewYear = document.getElementById('days');
console.log(daysOfNewYear);
const hoursOfNewYear = document.getElementById("hours");
console.log(hoursOfNewYear);

const minsOfNewYear = document.getElementById("mins");
console.log(minsOfNewYear);

const secondsOfNewYear = document.getElementById("seconds");
console.log(secondsOfNewYear);
setInterval(countdown, 1000);

function countdown() {
  const newYear_timer = new Date(2023, 0, 22, 0, 0, 0, 0);
  const currentDate = new Date();
  const formatDate = (newYear_timer - currentDate) / 1000; //seconds
  const seconds = Math.floor(formatDate) % 60;
  const minutes = Math.floor(formatDate / 60) % 60;
  const hours = Math.floor(formatDate / 3600) % 24;
  const days = Math.floor(formatDate / 3600 / 24);
  console.log(days, hours, minutes, seconds)
  daysOfNewYear.innerHTML = formatTime(days);
  hoursOfNewYear.innerHTML = formatTime(hours);
  minsOfNewYear.innerHTML = formatTime(minutes);
  secondsOfNewYear.innerHTML = formatTime(seconds);
}

function formatTime (time) {
    return time < 10 ? `0${time}` : time;
}
