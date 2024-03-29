// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCCWtMFsDcdHXbL_95FZrmmZn9Ek-P3m0",
  authDomain: "emoji-type.firebaseapp.com",
  projectId: "emoji-type",
  storageBucket: "emoji-type.appspot.com",
  messagingSenderId: "196393954740",
  appId: "1:196393954740:web:526019e8cfc16016abd6e1",
  measurementId: "G-2XGB8T4M1W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

let score = 0;
let timerValue = 60;
let timerInterval;
const keywordsArray = ["dog", "cat", "bird", "fish", "elephant", "lion", "tiger", "zebra", "house", "book", "computer", "window", "man", "sock", "shoe", "taco", "hamburger", "pizza", "sushi", "chicken", "pig", "poo", "cry", "brain", "rainbow", "skull", "blood", "zombie", "clown", "alien", "swim", "angel", "angry", "mushroom", "pancake", "chocolate", "ice cream", "camera", "television", "laugh"];
//const keywordsArray = ["book"];
let currentName;

function startGame() {
  displayRandomEmoji();

  timerInterval = setInterval(updateTimer, 1000);
}

async function fetchRandomEmoji() {
  const i = Math.floor(Math.random() * keywordsArray.length);
  const word = keywordsArray[i];
  currentName = word;
  const response = await fetch(`https://emoji-api.com/emojis?search=${word}&access_key=a91c5f2c2f41ba42d6617f6fb7128fb2383c0c26`);
  const data = await response.json();

  console.log('Emoji API Response:', data); 

  if (Array.isArray(data) && data.length > 0 && typeof data[0].character === 'string') {
    return data[0].character;
  } else {
    console.error('Error fetching emoji. API response:', data);
    return ''; 
  }
}

async function displayRandomEmoji() {
  const randomEmoji = await fetchRandomEmoji();
  document.getElementById('emojiDisplay').innerText = randomEmoji;
}

function updateTimer() {
  timerValue--;
  document.getElementById('timerDisplay').innerText = timerValue + 's';


  if (timerValue === 0) {
    endGame();
  }
}


document.getElementById('inputField').addEventListener('input', function(event) {
  const userInput = event.target.value.trim();


  if (userInput !== '' && userInput.toLowerCase() === currentName) { 
    score += 10;
    document.getElementById('score').innerText = score + " points";
    displayRandomEmoji(); 
    document.getElementById('inputField').value = ''; 
  }
});

// Function to end the game
function endGame() {
  clearInterval(timerInterval);
  document.getElementById('timerDisplay').innerText = 'Time\'s up!';
  document.getElementById('inputField').disabled = true;
}

// Start the game when the page loads
startGame();
