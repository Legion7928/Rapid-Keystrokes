// Create a new Audio object with the audio file URL
var audio = new Audio('stgbg.mp3');

// Define a function to play the audio file
function playAudio() {
  audio.play();
  audio.autoplay = true;
  audio.loop = true;
}
function stopAudio() {
  audio.pause();
  audio.currentTime = 0;
  audio.autoplay = false;
  audio.loop = false;
}

// Randomly change the color of the backgrond every 5 seconds
let intervalbg = setInterval(() => {
  document.body.style.backgroundColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
}, 5000);

function playStartSound() {
  const context = new AudioContext();
  const oscillator = context.createOscillator();
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(220, context.currentTime);

  // Set up a ramp to increase the frequency smoothly
  const now = context.currentTime;
  oscillator.frequency.linearRampToValueAtTime(1110, now + 1);

  oscillator.connect(context.destination);
  oscillator.start();
  oscillator.stop(now + 1.0);
}

const buttonsef = document.querySelector('button');
buttonsef.addEventListener('click', event => {
  playStartSound();
});
//Pacumberto, King Art D. @Copyright 2023

// Function to show the loading screen with different loading states
function showLoadingScreen() {
  const loadingOverlay = document.getElementById('loading-overlay');
  const loadingMessage = document.getElementById('loading-message');
  loadingOverlay.style.display = 'flex';

  let loadingState = 0;
  const loadingInterval = setInterval(() => {
    loadingState = (loadingState + 1) % 5;

    switch (loadingState) {
      case 1:
        loadingMessage.innerText = 'Loading.';
        break;
      case 2:
        loadingMessage.innerText = 'Loading..';
        break;
      case 3:
        loadingMessage.innerText = 'Loading...';
        break;
      case 4:
        loadingMessage.innerText = 'Done!';
        clearInterval(loadingInterval);
        setTimeout(hideLoadingScreen, 1100);
        break;
    }
  }, 500);
}


// Function to hide the loading screen
function hideLoadingScreen() {
  const loadingOverlay = document.getElementById('loading-overlay');
  loadingOverlay.style.display = 'none';
}

// Call showLoadingScreen() to display the loading screen initially
showLoadingScreen();

// Define the list of words to use
const words = [
  "A.NET",
  "A-0",
  "System",
  "A+",
  "ABAP",
  "ABC",
  "ABC-",
  "ALGOL",
  "ACC",
  "Accent",
  "Ace",
  "Distributed",
  "Application",
  "Specification",
  "Language",
  "Action!",
  "ActionScript",
  "Actor",
  "Ada",
  "ISO/IEC 8652",
  "Adenine",
  "AdvPL",
  "Agda",
  "Agilent VEE",
  "Agora",
  "AIMMS",
  "Aldor",
  "Alef",
  "ALF",
  "ALGOL 58",
  "ALGOL 60",
  "ALGOL 68",
  "ALGOL W",
  "Alice",
  "Alma-0",
  "AmbientTalk",
  "Amiga E",
  "AMPL",
  "Analitik",
  "AngelScript",
  "Apache",
  "Pig-",
  "latin",
  "Apex",
  "APL",
  "App",
];
//Pacumberto, King Art D. @Copyright 2023

// Get DOM elements
const textElement = document.getElementById("text");
const inputElement = document.getElementById("input");
const startButton = document.getElementById("start-button");
const timerElement = document.getElementById("timer");
const resultElement = document.getElementById("result");

// Initialize variables
let currentWordIndex = 0;
let startTime = 0;
let totalTime = 0;
let correctWordsCount = 0;
let timer = null;

// Get a random word from the words array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}
//Pacumberto, King Art D. @Copyright 2023

// Update the text element with the current word
function setText() {
  textElement.innerText = getRandomWord();
}

// Handle user input
function handleInput() {
  // Check if the input matches the current word
  const inputText = inputElement.value.trim();
  const currentWord = textElement.innerText;

  if (inputText === currentWord) {
    // If the input matches, move to the next word
    inputElement.value = "";
    setText();
    correctWordsCount++;
    // If the game is finished, show the result
    if (currentWordIndex === words.length) {
      finishGame();
    }
  }
}
//Pacumberto, King Art D. @Copyright 2023

// Finish the game and show the result
function finishGame() {
  // Stop the timer and calculate the total time
  clearInterval(timer);
  const elapsedTime = Date.now() - startTime;
  totalTime += elapsedTime;
  timerElement.innerText = `Total time: ${totalTime / 1000}s`;

  // Disable the input and show the result
  inputElement.disabled = true;
  const wordsPerMinute = Math.round(correctWordsCount / (totalTime / 1000 / 60));
  resultElement.innerText = `You typed ${wordsPerMinute} words per minute!`;

  // Re-enable the start button
  startButton.disabled = false;
  startButton.style.opacity = 1;
  timerElement.style.color = "white";
  playCongratsSound();
  playAudio();
  intervalbg = setInterval(() => {
  document.body.style.backgroundColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
}, 5000);
}
//Pacumberto, King Art D. @Copyright 2023

function playCongratsSound() {
// Create an audio context
const context = new AudioContext();

// Create the oscillator
const oscillator = context.createOscillator();
oscillator.type = 'sine';
oscillator.frequency.setValueAtTime(440, context.currentTime);

// Create the gain node to control volume
const gainNode = context.createGain();
gainNode.gain.setValueAtTime(0, context.currentTime);
gainNode.gain.linearRampToValueAtTime(1, context.currentTime + 0.2);
gainNode.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 1.5);

// Connect the oscillator to the gain node and the gain node to the audio context's destination
oscillator.connect(gainNode);
gainNode.connect(context.destination);

// Start the oscillator
oscillator.start(context.currentTime);
oscillator.stop(context.currentTime + 1);
}
//Pacumberto, King Art D. @Copyright 2023

// Start the game
function startGame() {
  // Disable the start button
  startButton.disabled = true;
  startButton.style.opacity = 0.5;
  stopAudio();
  clearInterval(intervalbg);

  // Reset variables
  currentWordIndex = 0;
  startTime = Date.now();
  totalTime = 0;
  correctWordsCount = 0;
  inputElement.value = "";
  inputElement.disabled = false;
  inputElement.focus();
  resultElement.innerText = "";
  setText();

  // Start the timer
  let secondsLeft = 60;
  timer = setInterval(() => {
    if (secondsLeft === 0) {
      finishGame();
    } else {
      secondsLeft--;
      timerElement.innerText = `Time left: ${secondsLeft}s`;
    if (secondsLeft <= 10) {
      timerElement.style.color = "red";
      playTickSound();
    }
    if (secondsLeft < 1) {
      playEndSound();
    }
    }
  }, 1000);
}
//Pacumberto, King Art D. @Copyright 2023

function playEndSound() {
  const context = new AudioContext();
  const oscillator = context.createOscillator();
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(220, context.currentTime);

  // Set up a ramp to increase the frequency smoothly
  const now = context.currentTime;
  oscillator.frequency.linearRampToValueAtTime(450, now + 1);

  oscillator.connect(context.destination);
  oscillator.start();
  oscillator.stop(now + 1.0);
}

function playTickSound() {
  const context = new AudioContext();
  const oscillator = context.createOscillator();
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(440, context.currentTime);
  oscillator.connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + 0.1);
}

// Initialize the game
function initGame() {
  startButton.addEventListener("click", startGame);
  inputElement.addEventListener("input", handleInput);
}
//Pacumberto, King Art D. @Copyright 2023

function restartGame() {
  // Reset variables
  currentWordIndex = 0;
  startTime = 0;
  totalTime = 0;
  correctWordsCount = 0;

  // Reset elements
  inputElement.value = "";
  resultElement.innerText = "";
  timerElement.innerText = "";
  startButton.innerText = "Start";
  startButton.disabled = false;
  startButton.style.opacity = 1;

  // Clear the background color interval
  clearInterval(intervalbg);

  // Stop the timer
  clearInterval(timer);
}

//Pacumberto, King Art D. @Copyright 2023

// Call the initGame function to start the game
initGame();
//Pacumberto, King Art D. @Copyright 2023
