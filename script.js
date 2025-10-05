const btn = document.getElementById('surpriseBtn');
const msg = document.getElementById('message');
const song = document.getElementById('birthdaySong');
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confetti = [];

btn.addEventListener('click', () => {
  msg.classList.remove('hidden');
  btn.disabled = true;
  startConfetti();
  playSong();
});

// Play the birthday song
function playSong() {
  song.play().catch((e) => {
    alert("Click anywhere on the page to enable audio.");
  });
}

// Confetti functions
function random(min, max) {
  return Math.random() * (max - min) + min;
}

function createConfettiPiece() {
  return {
    x: random(0, canvas.width),
    y: random(-canvas.height, 0),
    radius: random(5, 10),
    color: `hsl(${random(0, 360)}, 100%, 50%)`,
    speed: random(2, 5),
    drift: random(-1, 1)
  };
}

function createConfetti() {
  for (let i = 0; i < 150; i++) {
    confetti.push(createConfettiPiece());
  }
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
    p.y += p.speed;
    p.x += p.drift;

    if (p.y > canvas.height) {
      p.y = random(-20, -10);
      p.x = random(0, canvas.width);
    }
  });
}

function startConfetti() {
  createConfetti();
  setInterval(drawConfetti, 16);
}
