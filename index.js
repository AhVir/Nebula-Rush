const canvas = document.querySelector('canvas');


const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Player Class
class Player{
  constructor(x, y, radius, color){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw(){
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
    context.fillStyle = this.color;
    context.fill(); 
  }
}

//Projectile Class
class Projectile {
  constructor(x, y, radius, color, velocity){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  draw_projectile(){
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
    context.fillStyle = this.color;
    context.fill();
  }

  update_projectile(){
    this.draw_projectile();
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}

// Main Player variables
const x_mainPlayer = canvas.width/2;
const y_mainPlayer = canvas.height/2;
const radius_mainPlayer = 30;
const color_mainPlayer = "blue";

const mainPlayer = new Player(x_mainPlayer, y_mainPlayer, radius_mainPlayer, color_mainPlayer);
mainPlayer.draw();

// Projectile array:
const projectiles = [];


function animate(){
  window.requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);
  mainPlayer.draw();
  
  projectiles.forEach((p, pIdx) => {
    p.update_projectile();

//    if(((p.x-p.radius < 0) || (p.x-p.radius > canvas.width)) &&
//      ((p.y-p.radius < 0) || (p.y-p.radius > canvas.height))){
//      projectiles.splice(pIdx, 1);
//    }
    
    if(p.x + p.radius < 0 || p.x - p.radius > canvas.width ||
       p.y + p.radius < 0 || p.y - p.radius > canvas.height){
      setTimeout(() => {
        projectiles.splice(pIdx, 1);
      }, 0);
    }
  });
}


//Event Listener
window.addEventListener('click', (mouseEvent) => {
  const angle = Math.atan2(mouseEvent.clientY - y_mainPlayer, mouseEvent.clientX - x_mainPlayer);
  console.log("Angle: ", angle);

  const x_projectile = Math.cos(angle);
  const y_projectile = Math.sin(angle);

  projectiles.push(new Projectile(x_mainPlayer, y_mainPlayer, 10, "black", {x: x_projectile, y: y_projectile}));

  console.log(projectiles);
});


animate();
