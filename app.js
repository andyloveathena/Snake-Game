const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const unit = 20;

const row = canvas.height / unit;

const column = canvas.width / unit;

let snake = [];

snake[0] = {
  x: 80,
  y: 0,
};

snake[1] = {
  x: 60,
  y: 0,
};

snake[2] = {
  x: 40,
  y: 0,
};

snake[3] = {
  x: 20,
  y: 0,
};

window.addEventListener("keydown", changeDirection);
let d = "Right";
function changeDirection(e) {
  if (e.key == "ArrowLeft" && d != "Right") {
    d = "Left";
  } else if (e.key == "ArrowRight" && d != "Left") {
    d = "Right";
  } else if (e.key == "ArrowUp" && d != "Down") {
    d = "Up";
  } else if (e.key == "ArrowDown" && d != "Up") {
    d = "Down";
  }
  window.removeEventListener("keydown", changeDirection);
}

class Fruit {
  constructor() {
    this.x = Math.floor(Math.random() * column) * unit;
    this.y = Math.floor(Math.random() * row) * unit;
  }

  drawFruit() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, unit, unit);
  }

  pickALocation() {
    let overlapping = false;
    let new_x;
    let new_y;

    do {
      new_x = Math.floor(Math.random() * column) * unit;
      new_y = Math.floor(Math.random() * row) * unit;
    } while (overlapping);

    this.x = new_x;
    this.y = new_y;
  }
}

let myfruit = new Fruit();

let score = 0;
let highestscore = 0;
function checkscore() {
  if (localStorage.getItem("highestscore") == null) {
    highestscore = 0;
    localStorage.setItem("highestscore", highestscore);
    return highestscore;
  } else {
    highestscore = Number(localStorage.getItem("highestscore"));
    return highestscore;
  }
}

function pickhigherscore(highestscore, score) {
  if (score > highestscore) {
    localStorage.setItem("highestscore", score);
  }
}
document.getElementById("myScore").innerHTML = "遊戲分數" + score;
document.getElementById("myScore2").innerHTML =
  "最高分數" + Number(localStorage.getItem("highestscore"));

function draw() {
  for (i = 1; i < snake.length; i++) {
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      clearInterval(mygame);
      alert("game over");
    }
  }
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.height, canvas.width);

  myfruit.drawFruit();
  for (let i = 0; i < snake.length; i++) {
    if (i == 0) {
      ctx.fillStyle = "lightgreen";
    } else {
      ctx.fillStyle = "lightblue";
    }

    if (snake[i].x >= canvas.width) {
      snake[i].x = 0;
    } else if (snake[i].x < 0) {
      snake[i].x = canvas.width - unit;
    } else if (snake[i].y < 0) {
      snake[i].y = canvas.height - unit;
    } else if (snake[i].y >= canvas.height) {
      snake[i].y = 0;
    }

    ctx.strokeStyle = "white";
    ctx.fillRect(snake[i].x, snake[i].y, unit, unit);
    ctx.strokeRect(snake[i].x, snake[i].y, unit, unit);
  }
  window.addEventListener("keydown", changeDirection);

  let snakex = snake[0].x;
  let snakey = snake[0].y;
  if (d == "Left") {
    snakex -= unit;
  } else if (d == "Up") {
    snakey -= unit;
  } else if (d == "Right") {
    snakex += unit;
  } else if (d == "Down") {
    snakey += unit;
  }

  let newhead = {
    x: snakex,
    y: snakey,
  };

  if (snake[0].x == myfruit.x && snake[0].y == myfruit.y) {
    myfruit.pickALocation();
    score++;
    checkscore();
    pickhigherscore(highestscore, score);
    document.getElementById("myScore").innerHTML = "遊戲分數" + score;
    document.getElementById("myScore2").innerHTML =
      "最高分數" + Number(localStorage.getItem("highestscore"));
  } else {
    snake.pop();
  }

  snake.unshift(newhead);
}
let mygame = setInterval(draw, 100);
