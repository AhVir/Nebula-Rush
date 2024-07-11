const canvas = document.querySelector('canvas');
const context = canvas.getContext("2d");

const scoreCard = document.querySelector("#scorenum");
const startButton = document.querySelector("#startBtn");
const startMenu = document.querySelector("#startMenu");

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

// Particle Class
const particleFriction = .99;  //friction value for particles
class Particle{
  constructor(x, y, radius, color, velocity){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.alpha = 1;
  }

  draw_particle(){
    context.save();
    context.globalAlpha = this.alpha;
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
    context.fillStyle = this.color;
    context.fill();
    context.restore();
  }

  update_particle(){
    this.draw_particle();
    // applying friction
    this.velocity.x *= particleFriction;
    this.velocity.y *= particleFriction;
    
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.01;
  }
}

// Main Player variables
const x_mainPlayer = canvas.width/2;
const y_mainPlayer = canvas.height/2;
const radius_mainPlayer = 10;
const color_mainPlayer = "white";
let score = 0;

const mainPlayer = new Player(x_mainPlayer, y_mainPlayer, radius_mainPlayer, color_mainPlayer);
mainPlayer.draw();

// Arrays:
const projectiles = [];
const enemies = [];
const particles = [];


let animationID

function animate(){
  animationID = window.requestAnimationFrame(animate);
  //context.fillStyle = "black";
  context.fillStyle = "rgba(0, 0, 0, 0.1)"; //rgba->(r, g, b, alpha), that alpha making the whole fade effect, daayyyyyyaam!!
  context.fillRect(0, 0, canvas.width, canvas.height);
  mainPlayer.draw();


  particles.forEach((particle, particleIdx) => {
    if(particle.alpha <= 0){
      particles.splice(particleIdx, 1);
    }
    else{
      particle.update_particle();
    }
  });
  
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
   text-xl      
      }, 0);
    }

    // enemy-projectile collision
    projectiles.forEach((p, pIdx) => {
      const dist = Math.hypot(e.x - p.x, e.y - p.y);
//      const dist = Math.hypot(p.x - e.x, p.y - e.y);

      if(dist - p.radius - e.radius < 1){
        // pushing new particles, when collision happens
        for(let i = 0; i<e.radius * 2; i++){
          particles.push(new Particle(p.x, p.y, Math.random()*2, e.color, {
            x: (Math.random() - 0.5) * (Math.random()*6),
            y: (Math.random() - 0.5) * (Math.random()*6)
          }))
        }

        if(e.radius - 10 > 5){
          gsap.to(e, {
            radius: e.radius - 10
          })
          setTimeout(() => {
            projectiles.splice(pIdx, 1);
          }, 0);

          // adding score of 100 for each hit to enemies
          score += 100;
          scoreCard.innerHTML = score;
        }
        else{
          setTimeout(() => {
            enemies.splice(eIdx, 1);
            projectiles.splice(pIdx, 1);
          }, 0);

          // adding score of 250 for removing enemy from the screen 
          score += 250;
          scoreCard.innerHTML = score;
        }
      }
    });

    // enemy-main player collision
    const mainPlayerDist = Math.hypot(x_mainPlayer - e.x, y_mainPlayer - e.y);
    if(mainPlayerDist - radius_mainPlayer - e.radius < 1){
      console.log("Game ended!")
      window.cancelAnimationFrame(animationID);
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

//    const colorEnemy = "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0");
    const colorEnemy = `hsl(${Math.random()*360}, 50%, 50%)` //hsl(hue, saturation, lightness) & hue can be between 0 to 360

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

  const x_projectile = Math.cos(angle) * 6;
  const y_projectile = Math.sin(angle) * 6;

  projectiles.push(new Projectile(x_mainPlayer, y_mainPlayer, 10, "white", {x: x_projectile, y: y_projectile}));

  console.log(projectiles);
  console.log(enemies);
});


startButton.addEventListener('click', () => {
  console.log("StartBtn clicked");
  spawn_enemies();
  animate();
  startMenu.style.display = 'none';
});
