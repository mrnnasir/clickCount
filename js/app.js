// Initialize score and time variables
let score = 0;
let time = 60;

// Get DOM elements
const playerName = document.getElementById('playerName'); // Input field for player name
const btn1 = document.getElementById("btn1"); // "Click me" button (game button)
const btn2 = document.getElementById("btn2"); // Submit button (send score)
const btn3 = document.getElementById("btn3"); // Scoreboard button (load scores)
const scoreDisplay = document.getElementById("scoreDisplay"); // Displays current score
const timeLeft = document.getElementById("timeLeft"); // Displays remaining time
const playerScore = document.getElementById("playerScore"); // Container for messages/results

// Track whether the timer has started
let timerStarted = false;

// Event listener for main game button
btn1.addEventListener("click", () => {
  disableSubmitButton(); // Prevent submitting while playing

  // Start timer only once
  if (!timerStarted) {
    timeCounter();
    timerStarted = true;
  }

  increaseScore(); // Increase score on every click
});

// Function to increase score and update UI
function increaseScore() {
  score++;
  scoreDisplay.innerHTML = score;
}

// Function to handle countdown timer
function timeCounter() {
  const timer = setInterval(() => {
    timeLeft.innerHTML = time; // Display current time

    // When time reaches 0
    if (time === 0) {
      clearInterval(timer); // Stop timer
      timeLeft.innerHTML = "Time's Up!"; // Show message
      disableClickButton(); // Disable game button
      enableSubmitButton(); // Enable submit button
      return; // Stop further execution
    }

    time--; // Decrease time each second
  }, 1000);
}

// Disable the main click button (end of game)
function disableClickButton() {
  btn1.disabled = true;
}

// Disable submit button (during gameplay)
function disableSubmitButton() {
  btn2.disabled = true;
}

// Enable submit button (after game ends)
function enableSubmitButton() {
  btn2.disabled = false;
}

// Attach event listener to submit button
btn2.addEventListener("click", submitButton);

// Function to handle score submission
async function submitButton() {

  // Remove any existing messages before showing new ones
  let removeEl = document.getElementsByClassName('message');
  [...removeEl].forEach(el => el.remove());

  // Get and trim player name input
  const name = playerName.value.trim();

  // Validate input (must not be empty)
  if (!name) {
    showMessage("Please enter valid name");
    return;
  }

  try {
    // Send data to Zapier webhook
    const response = await fetch("https://hooks.zapier.com/hooks/catch/8338993/ujs9jj9/", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        score: score,
      }),
    });

    // Check if request failed
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // Parse response JSON
    await response.json();

    // Show success message
    showMessage("Score saved successfully");

    // Disable submit button after submission
    btn2.disabled = true;

    // Create and display result summary
    let resultP = document.createElement("p");
    resultP.classList.add("result");
    resultP.innerHTML =
      'Player name: ' + playerName.value +
      ' and the score is: <strong>' + score + '</strong>';

    playerScore.appendChild(resultP);
  }

  catch (error) {
    // Show error message if request fails
    showMessage("Failed to save score");
  }
}

// Function to display messages to user
function showMessage(msg) {
  let messageP = document.createElement("p");
  messageP.classList.add("message");
  messageP.innerHTML = msg;
  playerScore.appendChild(messageP);
}

// Attach event listener to scoreboard button
btn3.addEventListener("click", loadScoreboard);

// Function to load and display scoreboard
async function loadScoreboard() {
  const scoreboardEl = document.getElementById("scoreboard");

  try {
    // Fetch scoreboard data from Google Apps Script
    const response = await fetch("https://script.google.com/macros/s/AKfycbys5aEPMvNCutyhNYYCcQcCjzsi2UtqNspmKyCH-AicJxJbCJMrAoT0LUaYaXhTWA8n/exec");
    const data = await response.json();

    // Sort scores in descending order (highest first)
    data.sort((a, b) => b.score - a.score);

    // Clear previous scoreboard entries
    scoreboardEl.innerHTML = "";

    // Display each score entry
    data.forEach((entry, index) => {
      const row = document.createElement("p");
      row.innerHTML = `${index + 1}. ${entry.name} - <strong>${entry.score}</strong>`;
      scoreboardEl.appendChild(row);
    });

  } catch (error) {
    // Handle errors during fetch
    console.error(error);
    scoreboardEl.textContent = "Failed to load scoreboard";
  }
}
