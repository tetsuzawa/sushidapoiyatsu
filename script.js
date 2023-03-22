const words = [
  "寿司", "刺身", "鮨", "鯖", "軍艦", "天ぷら", "切り身", "握り", "焼魚", "海老",
  "マグロ", "タコ", "イカ", "サーモン", "ハマチ", "ワカメ", "カンパチ", "カキ", "ウニ", "イクラ"
];
const romajiWords = [
  "sushi", "sashimi", "sushi", "saba", "gunkan", "tempura", "kirimono", "nigiri", "yakizakana", "ebi",
  "maguro", "tako", "ika", "salmon", "hamachi", "wakame", "kanpachi", "kaki", "uni", "ikura"
];
const menu = document.getElementById("menu");
const game = document.getElementById("game");
const result = document.getElementById("result");
const currentWord = document.getElementById("current-word");
const romajiWord = document.getElementById("romaji-word");
const timer = document.getElementById("timer");
const progress = document.getElementById("progress");
const score = document.getElementById("score");
const finalScore = document.getElementById("final-score");
const startButton = document.getElementById("start-game");
const restartButton = document.getElementById("restart-game");

let timeLeft = 60;
let correctWords = 0;
let activeWord = "";
let activeRomaji = "";
let currentCharIndex = 0;
let scoreMultiplier = 1;
let consecutiveCorrect = 0;
let timeBonus = 0;

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
  currentCharIndex = 0;
}

function updateHighlight() {
  const romajiChars = romajiWord.getElementsByTagName("span");
  for (let i = 0; i < romajiChars.length; i++) {
    if (i < currentCharIndex) {
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
  const timerId = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateStats();
    } else {
      clearInterval(timerId);
      document.removeEventListener("keypress", handleKeyPress);
      showResult();
    }
  }, 1000);
}

function handleKeyPress(e) {
  const input = e.key;
  if (input === activeRomaji[currentCharIndex]) {
    currentCharIndex++;
    updateHighlight();

    if (currentCharIndex === activeRomaji.length) {
      correctWords += activeRomaji.length * scoreMultiplier;
      consecutiveCorrect++;
      timeBonus = Math.min(consecutiveCorrect, 5);
      timeLeft += timeBonus;
      showNextWord();
      updateStats();
    }
  } else {
    consecutiveCorrect = 0;
  }
}

function showMenu() {
  menu.style.display = "block";
  game.style.display = "none";
  result.style.display = "none";
}

function showGame() {
  menu.style.display = "none";
  game.style.display = "block";
  result.style.display = "none";
}

function showResult() {
  menu.style.display = "none";
  game.style.display = "none";
  result.style.display = "block";
  finalScore.innerText = correctWords;
}

startButton.addEventListener("click", () => {
  showGame();
  showNextWord();
  startTimer();
  document.addEventListener("keypress", handleKeyPress);
});

restartButton.addEventListener("click", () => {
  timeLeft = 60;
  correctWords = 0;
  consecutiveCorrect = 0;
  showGame();
  showNextWord();
  startTimer();
  document.addEventListener("keypress", handleKeyPress);
});

showMenu();
