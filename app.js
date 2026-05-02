let secretNumber;
let score;
let highScore = localStorage.getItem("highScore") || 0;
let time = 30;
let timer;

// 🎮 Start Game
function startGame() {
  let level = document.getElementById("level").value;

  if (level == 10) {
    secretNumber = Math.floor(Math.random() * 50) + 1;
  } else if (level == 7) {
    secretNumber = Math.floor(Math.random() * 100) + 1;
  } else {
    secretNumber = Math.floor(Math.random() * 200) + 1;
  }

  score = level;
  time = 30;

  document.getElementById("score").textContent = score;
  document.getElementById("highscore").textContent = highScore;
  document.getElementById("message").textContent = "Start guessing...";
  document.getElementById("guess").value = "";

  clearInterval(timer);
  timer = setInterval(() => {
    time--;
    document.getElementById("timer").textContent = time;

    if (time === 0) {
      document.getElementById("message").textContent = "⏰ Time's up!";
      clearInterval(timer);
    }
  }, 1000);
}


// 🎯 Check Guess
function checkGuess() {
  playClick();

  let guess = Number(document.getElementById("guess").value);
  let message = document.getElementById("message");

  if (!guess) {
    message.textContent = "⛔ Enter a number!";
  } 
  else if (guess === secretNumber) {
    message.textContent = "🎉 Correct!";
    playWin();

    document.body.style.backgroundColor = "green";
    setTimeout(() => {
      document.body.style.backgroundColor = "";
    }, 800);

    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore);
      document.getElementById("highscore").textContent = highScore;
    }

    clearInterval(timer);
  } 
  else {
    if (score > 1) {
      message.textContent = guess > secretNumber ? "📈 Too High!" : "📉 Too Low!";
      score--;
      document.getElementById("score").textContent = score;
    } else {
      message.textContent = "💥 You lost!";
      document.getElementById("score").textContent = 0;
      clearInterval(timer);
    }
  }
}

// 🔁 Reset
function resetGame() {
  startGame();
}

// 🌙 Dark Mode
function toggleMode() {
  document.body.classList.toggle("dark");
}

// ⌨️ Enter Key
document.getElementById("guess").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    checkGuess();
  }
});

// 🌈 Background animation
setInterval(() => {
  document.body.style.backgroundColor =
    "hsl(" + Math.random() * 360 + ", 70%, 85%)";
}, 4000);

// Start on load
startGame();