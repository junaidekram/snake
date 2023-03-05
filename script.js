const canvas = document.getElementById("game-area");
const c = canvas.getContext("2d");
document.addEventListener("keydown", keyHandler, false);
const gridSize = 40;
const blockWidth = canvas.width / gridSize;
const blockHeight = canvas.height / gridSize;
const scoreDiv = document.getElementById("score");
const highscoreDiv = document.getElementById("highscore");
const statusDiv = document.getElementById("status");
let snake = [];
var numBlock = 5;
let xCor = 10;
let yCor = 2;
let score = 5;
let highscore = 0;
let newHeads = false;
var foodCor = {
  x: Math.floor(Math.random() * 40),
  y: Math.floor(Math.random() * 40)
};
var foodCor2 = {
  x: Math.floor(Math.random() * 40),
  y: Math.floor(Math.random() * 40)
};
var foodCor3 = {
  x: Math.floor(Math.random() * 40),
  y: Math.floor(Math.random() * 40)
};
var foodCor4 = {
  x: Math.floor(Math.random() * 40),
  y: Math.floor(Math.random() * 40)
};
var foodCor5 = {
  x: Math.floor(Math.random() * 40),
  y: Math.floor(Math.random() * 40)
};
function start() {
  startBtn.disabled = true;
  c.clearRect(0, 0, 400, 400);
  xCor = 10;
  yCor = 2;
  snake = [];
  numBlock = 5;
  score = 5;
  snakeDir = "right";
  statusDiv.innerHTML = "";
  for (var y = 0; y < 5; y++) {
    snake.push({ x: xCor, y: yCor });
    xCor -= 1;
  }
  drawSnake();
  drawBlock({ x: foodCor.x, y: foodCor.y }, "green");
  setTimeout(tick, 100);
}
function drawBlock(block, color) {
  c.fillStyle = color;
  c.fillRect(block.x * 10, block.y * 10, 10, 10);
}
function drawSnake() {
  for (var j = 0; j < snake.length; j++) {
    c.fillStyle = "rgb(0, 100, 210)";
    c.fillRect(snake[j].x * 10, snake[j].y * 10, 10, 10);
  }
}
let snakeDir = "right";
function keyHandler(e) {
  if (e.key == "ArrowRight") {
    if (snakeDir == "up" || snakeDir == "down"){
      snakeDir = "right";
    }
  } else if (e.key == "ArrowLeft") {
    if (snakeDir == "up" || snakeDir == "down"){
      snakeDir = "left";
    }
  } else if (e.key == "ArrowUp") {
    if (snakeDir == "left" || snakeDir == "right"){
      snakeDir = "up";
    }
  } else if (e.key == "ArrowDown") {
    if (snakeDir == "left" || snakeDir == "right"){
      snakeDir = "down";
    }
  }
}
function moveSnake() {
  let newHead = {};
  if (snakeDir == "right") {
    newHead = { x: snake[0].x + 1, y: snake[0].y };
  } else if (snakeDir == "left") {
    newHead = { x: snake[0].x - 1, y: snake[0].y };
  } else if (snakeDir == "up") {
    newHead = { x: snake[0].x, y: snake[0].y-1 };
  } else if (snakeDir == "down") {
    newHead = { x: snake[0].x, y: snake[0].y+1 };
  }
  snake.unshift(newHead)
}
function checkCollisions(){
  for(var p = 0; p < score-1; p++){
    if (snake[p] != snake[0]){
      if (snake[p].x == snake[0].x && snake[p].y == snake[0].y){
        return true;
      }
    }
  }
  if (snake[0].x < 0){
    return true;
  }else if(snake[0].x > 39){
    return true;
  }else if(snake[0].y < 0){
    return true;
  }else if(snake[0].y > 39){
    return true;
  }
  if (snake[0].x == foodCor.x && snake[0].y == foodCor.y){
    resetFood();
    score ++;
  }else{
    snake.pop()
  }
  if (snake[0].x == foodCor2.x && snake[0].y == foodCor2.y){
    return true;
  }
  if (snake[0].x == foodCor3.x && snake[0].y == foodCor3.y){
    return true;
  }
  if (snake[0].x == foodCor4.x && snake[0].y == foodCor4.y){
    return true;
  }
  if (snake[0].x == foodCor5.x && snake[0].y == foodCor5.y){
    return true;
  }
}
function resetFood(){
  foodCor = {
  x: Math.floor(Math.random() * 40),
  y: Math.floor(Math.random() * 40)
};
  foodCor2 = {
  x: Math.floor(Math.random() * 40),
  y: Math.floor(Math.random() * 40)
};
  foodCor3 = {
  x: Math.floor(Math.random() * 40),
  y: Math.floor(Math.random() * 40)
};
  foodCor4 = {
  x: Math.floor(Math.random() * 40),
  y: Math.floor(Math.random() * 40)
};
  foodCor5 = {
  x: Math.floor(Math.random() * 40),
  y: Math.floor(Math.random() * 40)
};
  drawBlock({ x: foodCor.x, y: foodCor.y }, "green");
  drawBlock({ x: foodCor2.x, y: foodCor2.y }, `rgb(${0} , ${210}, ${50})`);
    drawBlock({ x: foodCor3.x, y: foodCor3.y }, `rgb(${Math.floor(Math.random() * 100)} , ${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100)})`);
    drawBlock({ x: foodCor4.x, y: foodCor4.y }, `rgb(${Math.floor(Math.random() * 150)} , ${Math.floor(Math.random() * 150)}, ${Math.floor(Math.random() * 150)})`);
    drawBlock({ x: foodCor5.x, y: foodCor5.y }, `rgb(${Math.floor(Math.random() * 200)} , ${Math.floor(Math.random() * 200)}, ${Math.floor(Math.random() * 200)})`);
}

function tick() {
  moveSnake();
  highscoreDiv.innerHTML = "Highscore: " + highscore;
  let collision = checkCollisions();
  if (collision){
    statusDiv.innerHTML = "GAME OVER";
    if (score > highscore){
      highscore = score;
      highscoreDiv.innerHTML = "Highscore: " + highscore;
    }
    startBtn.disabled = false;
  }else{
    scoreDiv.innerHTML = "Score: " + score;
    c.clearRect(0, 0, 400, 400);
    drawSnake();
    drawBlock({ x: foodCor.x, y: foodCor.y }, `rgb(${Math.floor(Math.random() * 250)} , ${Math.floor(Math.random() * 250)}, ${Math.floor(Math.random() * 250)})`);
    drawBlock({ x: foodCor2.x, y: foodCor2.y }, `rgb(${0} , ${210}, ${50})`);
    drawBlock({ x: foodCor3.x, y: foodCor3.y }, `rgb(${Math.floor(Math.random() * 100)} , ${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100)})`);
    drawBlock({ x: foodCor4.x, y: foodCor4.y }, `rgb(${Math.floor(Math.random() * 150)} , ${Math.floor(Math.random() * 150)}, ${Math.floor(Math.random() * 150)})`);
    drawBlock({ x: foodCor5.x, y: foodCor5.y }, `rgb(${Math.floor(Math.random() * 200)} , ${Math.floor(Math.random() * 200)}, ${Math.floor(Math.random() * 200)})`);
    setTimeout(tick, 100)
  }
}