let btnStartGame = document.querySelector('.buttonStartGame');

btnStartGame.addEventListener('click', function () {
  document.querySelector('.menu--active').classList.remove('menu--active');
});

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "img/ground.svg";

const fishImg = new Image();
fishImg.src = "img/food/fish.svg";

const hedgehogImg = new Image();
hedgehogImg.src = "img/food/hedgehog.svg";

let box = 32;

let scoreAll = document.querySelector('.score--all');
scoreAll.value = 0;
let score = document.querySelector('.result__score');
score.value = 0;
let record = document.querySelector('.result__record');
let ball = document.querySelector('.result__ball');
ball.style.maxWidth = score.value.length * 30 + "px";
localStorage.setItem('record', scoreAll.value);


let fish = {
  x: Math.floor((Math.random() * 17 + 1)) * box,
  y: Math.floor((Math.random() * 15 + 3)) * box
}

let hedgehog = {
  x: Math.floor((Math.random() * 17 + 1)) * box,
  y: Math.floor((Math.random() * 15 + 3)) * box
}

let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box
};

document.addEventListener("keydown", direction);

let dir;

function direction(event) {
  if (event.keyCode == 37 && dir != "right")
    dir = "left";
  else if (event.keyCode == 38 && dir != "down")
    dir = "up";
  else if (event.keyCode == 39 && dir != "left")
    dir = "right";
  else if (event.keyCode == 40 && dir != "up")
    dir = "down";
}

function eatTail(head, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (head.x == arr[i].x && head.y == arr[i].y) {
      clearInterval(game);
      document.querySelector('.result').classList.add('result--active');
    }
  }
}

function drawGame() {
  ctx.drawImage(ground, 0, 0);

  ctx.drawImage(fishImg, fish.x, fish.y);

  // ctx.drawImage(hedgehogImg, hedgehog.x, hedgehog.y);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? "green" : "darkgreen";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (snakeX == fish.x && snakeY == fish.y) {
    scoreAll.value++;
    score.value++;
    ball.style.maxWidth = score.value.length * 30 + "px";

    fish = {
      x: Math.floor((Math.random() * 17 + 1)) * box,
      y: Math.floor((Math.random() * 15 + 3)) * box
    };
  } else {
    snake.pop();
  }

  if (snakeX < box || snakeX > box * 17 ||
    snakeY < 3 * box || snakeY > box * 17) {
    clearInterval(game);
    document.querySelector('.result').classList.add('result--active');
  }

  if (dir == "left") snakeX -= box;
  if (dir == "right") snakeX += box;
  if (dir == "up") snakeY -= box;
  if (dir == "down") snakeY += box;

  let newHead = {
    x: snakeX,
    y: snakeY
  };

  eatTail(newHead, snake);

  snake.unshift(newHead);
}

let game = setInterval(drawGame, 100);

document.querySelector('.restart').addEventListener('click', function () {
  window.location.href = "./index.html";
  document.querySelector('.result').classList.remove('result--active');
});