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
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}

const mainPlayer = new Player(100, 100, 30, "blue");
mainPlayer.draw();

//const projectile = new Projectile(canvas.width/2, canvas.height/2, 5, "red", {x: 1, y: 1});
//const projectile2 = new Projectile(canvas.width/2, canvas.height/2, 5, "purple", {x: -1, y: 1});
//const projectile3 = new Projectile(canvas.width/2, canvas.height/2, 5, "aqua", {x: -1, y: -1});
//const projectile4 = new Projectile(canvas.width/2, canvas.height/2, 5, "lime", {x: +1, y: -0.5});

// projectiles array

const projectiles = [];

//Animation
function animate(){
  window.requestAnimationFrame(animate);
  //projectile.draw_projectile();
  //projectile.update();

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  mainPlayer.draw();
  projectiles.forEach((p) => {
    p.update();
  })
}

// Event Listener
window.addEventListener('click', (event) => {
  //console.log("event Clicked!!")
  //console.log(event);
  
  // Calculating the angle between main player and mouse Clicked
  //const angle = Math.atan2(event.clientY, event.clientX);
  const angle = Math.atan2(event.clientY - canvas.height/2, event.clientX - canvas.width/2);

  console.log("Angle: ", angle);

  projectiles.push(new Projectile(canvas.width/2, canvas.height/2, 5, "red", {x: Math.cos(angle), y: Math.sin(angle)}))

  animate();
})

