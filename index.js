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

// Enemy Class
class Enemy{
  constructor(x, y, radius, color, velocity){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  draw_enemy(){
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
    context.fillStyle = this.color;
    context.fill();
  }

  update_enemy(){
    this.draw_enemy();
    
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

// Arrays:
const projectiles = [];
const enemies = [];


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

  enemies.forEach((e, eIdx) => {
    e.update_enemy();

    if(e.x + e.radius < 0 || e.x - e.radius > canvas.width ||
       e.y + e.radius < 0 || e.y - e.radius > canvas.height){
      setTimeout(() => {
        enemies.splice(eIdx, 1);
        
      }, 0);
    }
  });
}


function spawn_enemies(){
  setInterval(() => {
    const radiusEnemy = Math.random() * (30-4) + 4;
    let xEnemy
    let yEnemy
    if(Math.random() < 0.5){
      xEnemy = Math.random() < 0.5 ? 0 - radiusEnemy : canvas.width + radiusEnemy;
      yEnemy = Math.random() * canvas.height;
    } 
    else{
      xEnemy = Math.random() * canvas.width;
      yEnemy = Math.random() < 0.5 ? 0 - radiusEnemy : canvas.height + radiusEnemy;
    }

    const colorEnemy = "pink";

    //angle towards the Main Player
    const angle = Math.atan2(y_mainPlayer - yEnemy, x_mainPlayer - xEnemy);

    const velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle)
    }

    enemies.push(new Enemy(xEnemy, yEnemy, radiusEnemy, colorEnemy, velocity))
  }, 1000);
}


//Event Listener
window.addEventListener('click', (mouseEvent) => {
  const angle = Math.atan2(mouseEvent.clientY - y_mainPlayer, mouseEvent.clientX - x_mainPlayer);
  console.log("Angle: ", angle);

  const x_projectile = Math.cos(angle);
  const y_projectile = Math.sin(angle);

  projectiles.push(new Projectile(x_mainPlayer, y_mainPlayer, 10, "black", {x: x_projectile, y: y_projectile}));

  console.log(projectiles);
  console.log(enemies);
});


spawn_enemies();
animate();
