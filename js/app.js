let score = 0;
let time = 5;

const playerName = document.getElementById('playerName'); // Input Player Name
const btn1 = document.getElementById("btn1"); // Click me button
const btn2 = document.getElementById("btn2"); // Submit button
const scoreDisplay = document.getElementById("scoreDisplay")
const timeLeft = document.getElementById("timeLeft");
// const result = document.getElementById("result");

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
      enableSubmitButton();
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

btn2.addEventListener("click", submitButton, { once: true });

function submitButton() {
  console.log(playerName.value);
  let resultP = document.createElement("p");
  resultP.classList.add("result");
  resultP.innerHTML = playerName.value;
  document.body.appendChild(resultP);
} //TODO: Need to add score
