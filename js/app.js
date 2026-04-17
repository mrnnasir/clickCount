let score = 0;
let time = 5;

const playerName = document.getElementById('playerName');
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const scoreDisplay = document.getElementById("scoreDisplay")
const timeLeft = document.getElementById("timeLeft");

let timerStarted = false;

btn1.addEventListener("click", () => {
  disableSubmitButton();
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
      disableClickButton();
      enableSubmitButton()
      return; // stop further execution
    }
    time--;// then decrease
  }, 1000);
}

function disableClickButton() {
  btn1.disabled = true;
}

function disableSubmitButton() {
  btn2.disabled = true;
}

function enableSubmitButton() {
  btn2.disabled = false;
}
btn2.addEventListener("click", () => {
  submitButton();
})

function submitButton() {
  console.log(playerName.value);
}
