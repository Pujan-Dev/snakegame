const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

class SnakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}



let speed = 10
let tilecount = 20
let headX = 10
let headY = 10
let titlesize = canvas.width / tilecount - 2;
const snakePart = []
let taillength = 2;

let Vx = 0
let Vy = 0

let Ax = 5;
let Ay = 5;


// main game loop
function drawGame() {
  clearscreen()
  cheakApplepos()
  let result = isgameover()
  if(result){
    return  
  }
  changeSnakePOS()
  DRAWAPPLE()
  DrawSnake();
  setTimeout(drawGame, 1000 / speed)
}
function cheakApplepos() {
  if (Ax === headX && Ay === headY) {
    Ax = Math.floor(Math.random() * tilecount)
    Ay = Math.floor(Math.random() * tilecount)
    taillength += 1;
  }
}
function isgameover(){
  let gameover = false

  if(headX<0){
    gameover = true
  }
  else if(headX===tilecount){
    gameover = true
  }
  else if(headY<0){
    gameover = true
  }
  else if(headY===tilecount){
    gameover = true
  }

  if(gameover){
    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", canvas.width/2, canvas.height/2);

  }
  return gameover

}
function clearscreen() {
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function DRAWAPPLE() {
  ctx.fillStyle = 'red'
  ctx.fillRect(Ax * tilecount, Ay * tilecount, titlesize, titlesize)
}
function DrawSnake() {
  ctx.fillStyle = 'orange'
  ctx.fillRect(headX * tilecount, headY * tilecount, titlesize, titlesize)
  ctx.fillStyle = 'green';
  for (let i = 0; i < snakePart.length; i++) {
    let part = snakePart[i]

    ctx.fillRect(part.x * tilecount, part.y * tilecount, titlesize, titlesize)


  }
  snakePart.push(new SnakePart(headX, headY))
  while (snakePart.length > taillength) {
    snakePart.shift();
  }
}
function changeSnakePOS() {
  headX = headX + Vx;
  headY = headY + Vy

}
document.body.addEventListener('keydown', keydown);
function keydown(event) {

  switch (event.keyCode) {
    case 38:
      if (Vy == 1) {
        return;
      }
      Vy = -1;
      Vx = 0;
      break;
    case 37:
      if (Vx == 1) {
        return;
      }
      Vy = 0;
      Vx = -1;
      break;
    case 39:
      if (Vx == -1) {
        return;
      }
      Vy = 0;
      Vx = +1;
      break;
    case 40:
      if (Vy == -1) {
        return;
      }
      Vy = 1;
      Vx = 0;
      break
    default:
      break;
  }

}

drawGame()
