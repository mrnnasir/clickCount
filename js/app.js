let score = 0;
let time = 59;

const btn1 = document.getElementById("btn1");
const scoreDisplay = document.getElementById("scoreDisplay")
const timeLeft = document.getElementById("timeLeft");

let timerStarted = false;

btn1.addEventListener("click", () => {
  if (!timerStarted) {
    timeCounter();
    timerStarted = true;
  }
  increaseScore();
});

function increaseScore() {
  score++;
  scoreDisplay.innerHTML = score;
}

function timeCounter() {
  const timer = setInterval(() => {
    timeLeft.innerHTML = time; // show first

    if (time === 0) {
      clearInterval(timer);
      timeLeft.innerHTML = "Time's Up!";
      disableButton();
      return; // stop further execution
    }
    time--; // then decrease
  }, 1000);
}

function disableButton() {
  btn1.disabled = true;
}
