const words = ["寿司", "刺身", "鮨", "鯖", "軍艦"]; // タイピング練習用の言葉
const romajiWords = ["sushi", "sashimi", "sushi", "saba", "gunkan"]; // ローマ字表記
const currentWord = document.getElementById("current-word");
const romajiWord = document.getElementById("romaji-word");
const inputField = document.getElementById("input-field");
const timer = document.getElementById("timer");
const progress = document.getElementById("progress");
const score = document.getElementById("score");

let timeLeft = 60;
let correctWords = 0;
let activeWord = "";
let activeRomaji = "";

function pickRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  return { word: words[randomIndex], romaji: romajiWords[randomIndex] };
}

function showNextWord() {
  const nextWord = pickRandomWord();
  activeWord = nextWord.word;
  activeRomaji = nextWord.romaji;
  currentWord.innerText = activeWord;
  romajiWord.innerHTML = activeRomaji.split('').map(char => `<span>${char}</span>`).join('');
  inputField.value = "";
}

function updateHighlight() {
  const input = inputField.value;
  const romajiChars = romajiWord.getElementsByTagName("span");

  for (let i = 0; i < romajiChars.length; i++) {
    if (input[i] === activeRomaji[i]) {
      romajiChars[i].classList.add("highlight");
    } else {
      romajiChars[i].classList.remove("highlight");
    }
  }
}

function updateStats() {
  timer.innerText = timeLeft;
  progress.innerText = `${Math.round((correctWords / words.length) * 100)}%`;
  score.innerText = correctWords;
}

function startTimer() {
  setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
    } else {
      inputField.disabled = true;
    }
    updateStats();
  }, 1000);
}

inputField.addEventListener("input", () => {
  updateHighlight();

  if (inputField.value === activeRomaji) {
    correctWords++;
    showNextWord();
  }
});

showNextWord();
startTimer();
