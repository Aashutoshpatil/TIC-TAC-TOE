// Step 1: Select all the boxes, message area, and reset button
const boxes = document.querySelectorAll(".game");
const message = document.createElement("h2");
const resetBtn = document.createElement("button");

// Step 2: Add the message and reset button to the page
message.innerText = "Player X's Turn";
resetBtn.innerText = "Restart Game";
resetBtn.style.marginTop = "20px";
resetBtn.style.padding = "10px 20px";
resetBtn.style.fontSize = "1rem";
resetBtn.style.border = "none";
resetBtn.style.borderRadius = "10px";
resetBtn.style.background = "#333";
resetBtn.style.color = "white";
resetBtn.style.cursor = "pointer";

// Add these below your main game board
document.querySelector("main").appendChild(message);
document.querySelector("main").appendChild(resetBtn);

// Step 3: Track the current turn
let turn = "X";
let gameOver = false;

// Step 4: Define winning patterns
const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Step 5: Handle box clicks
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (!gameOver && box.innerText === "") {
      box.innerText = turn;
      box.classList.add(turn === "X" ? "x" : "o");
      checkWinner();
      if (!gameOver) {
        turn = turn === "X" ? "O" : "X";
        message.innerText = `Player ${turn}'s Turn`;
      }
    }
  });
});

// Step 6: Check for winner
function checkWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    const val1 = boxes[a].innerText;
    const val2 = boxes[b].innerText;
    const val3 = boxes[c].innerText;

    if (val1 !== "" && val1 === val2 && val2 === val3) {
      showWinner(val1);
      return;
    }
  }

  // Step 7: Check for draw
  const allFilled = [...boxes].every((box) => box.innerText !== "");
  if (allFilled && !gameOver) {
    message.innerText = "It's a Draw! 🤝";
    message.style.color = "orange";
    gameOver = true;
  }
}

// Step 8: Show winner
function showWinner(winner) {
  showWinningCelebration(winner)
  message.innerText = `🎉 Player ${winner} Wins!`;
  message.style.color = "green";
  gameOver = true;

  // Disable all boxes
  boxes.forEach((box) => (box.disabled = true));
}

// Step 9: Reset game
resetBtn.addEventListener("click", () => {
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
    box.classList.remove("x", "o");
  });
  turn = "X";
  message.innerText = "Player X's Turn";
  message.style.color = "black";
  gameOver = false;
});
// ---------------------------

function showWinningCelebration(winnerName = "Player") {
  // Create popup
  const popup = document.createElement("div");
  popup.className = "winner-popup";
  popup.innerText = `${winnerName} Wins! 🎉`;
  document.body.appendChild(popup);

  // Create confetti canvas
  const canvas = document.createElement("canvas");
  canvas.id = "confettiCanvas";
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  // Resize canvas to full window
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const confetti = [];
  const colors = ["#FFD166", "#06D6A0", "#EF476F", "#118AB2", "#9B5CFF"];

  for (let i = 0; i < 150; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 3,
      d: Math.random() * 0.5 + 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.random() * 10 - 10
    });
  }

  // Animate confetti
  let animationId;
  function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach(p => {
      ctx.beginPath();
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.r, p.r * 0.6);
      ctx.fill();
    });
    updateConfetti();
    animationId = requestAnimationFrame(drawConfetti);
  }

  function updateConfetti() {
    confetti.forEach(p => {
      p.y += p.d * 6;
      p.x += Math.sin(p.tilt / 10);
      if (p.y > canvas.height) {
        p.y = -10;
        p.x = Math.random() * canvas.width;
      }
    });
  }

  drawConfetti();

  // Stop confetti after 4 seconds
  setTimeout(() => {
    cancelAnimationFrame(animationId);
    popup.remove();
    canvas.remove();
  }, 4000);
}







