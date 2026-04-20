let score = 0;
let time = 2;

const playerName = document.getElementById('playerName'); // Input Player Name
const btn1 = document.getElementById("btn1"); // Click me button
const btn2 = document.getElementById("btn2"); // Submit button
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

btn2.addEventListener("click", submitButton);

async function submitButton() {
  let removeEl = document.getElementsByClassName('message');
  [...removeEl].forEach(el => el.remove());

  const name = playerName.value.trim();
  if (!name) { // If no name is given
    showMessage("Please enter valid name");
    return;
  }

  try {
    const response = await fetch("https://hooks.zapier.com/hooks/catch/8338993/ujs9jj9/", {
      method: "POST",
      body: JSON.stringify({ // .stringify converts to String
        name: name,
        score: score,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    await response.json(); // Stores actual usable JSON data to data variable
    showMessage("Score saved successfully");
    btn2.disabled = true;

    let resultP = document.createElement("p");
    resultP.classList.add("result");
    resultP.innerHTML = 'Player name: '+ playerName.value + ' and the score is: ' + score;
    document.body.appendChild(resultP);
  }

  catch (error) {
    showMessage("Failed to save score");
  }
}

function showMessage(msg) {
  let messageP = document.createElement("p");
  messageP.classList.add("message");
  messageP.innerHTML = msg;
  document.body.appendChild(messageP);
}
