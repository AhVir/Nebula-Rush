const canvas = document.querySelector('canvas');

// selecting the canvas context
const ctx = canvas.getContext('2d');

canvas.width  = window.innerWidth
canvas.height = window.innerHeight

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
    ctx.arc(this.x, this.y, this.radius, 0 * (Math.PI/180), 360 * (Math.PI/180), false);
    ctx.fillStyle = this.color;
    ctx.fill();  
  }
}

// Creating a class for Projectile
class Projectile{
  constructor(x, y, radius, color, velocity){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  draw_projectile(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update(){
    this.draw_projectile();

    this.x =+ this.velocity.x;
    this.y =+ this.velocity.y;
  }
}

class Enemy{
  constructor(x, y, radius, color, velocity){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  draw_enemy(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update_enemy(){
    this.draw_enemy();

    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}

const mainPlayer = new Player(x, y, 30, "blue");
const projectiles = [];
const enemies = [];

function spawnEnemies(){
  setInterval(() => {
    //enemy constants
    const x = Math.random() * canvas.width/2;
    const y = 100;
    const radius = 30;
    const color = "lime";

    //enemy towards the player(center)
    //always substract -> {destination - current}

    enemies.push(new Enemy(100, 100, 30, color, {x: 1, y: 1}));
  }, 1000);
}

//Animation
function animate(){
  window.requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  mainPlayer.draw();
  projectiles.forEach((p) => {
    p.update();
  })

  enemies.forEach((e) => {
    e.update_enemy();
  })
}

// Event Listener
window.addEventListener('click', (event) => {
  const angle = Math.atan2(event.clientY - canvas.height/2, event.clientX - canvas.width/2);

  console.log("Angle: ", angle);

  projectiles.push(new Projectile(canvas.width/2, canvas.height/2, 5, "red", {x: Math.cos(angle), y: Math.sin(angle)}))
})

spawnEnemies();
animate();
