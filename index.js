const canvas = document.querySelector('canvas');

// selecting the canvas context
const ctx = canvas.getContext('2d');

canvas.width  = innerWidth
canvas.height = innerHeight

const x = canvas.width/2; 
const y = canvas.height/2; 

// Creating a class named Player
class Player{
  constructor(x, y, radius, color){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw(){
    ctx.beginPath();
    ctx.arc(x, y, this.radius, 0 * (Math.PI/180), 360 * (Math.PI/180), false);
    ctx.fillStyle = this.color;
//    ctx.strokeStyle = this.color;
//     ctx.stroke();
    ctx.fill();  
  }
}



const mainPlayer = new Player(100, 100, 30, "blue");
mainPlayer.draw();
