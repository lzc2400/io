const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

const mouse = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2 };

const colours = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];
const limit = 30;

window.addEventListener('mousemove', event => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

window.addEventListener('resize', () => {
  setCanvasDimensions();
  init();
});

function setCanvasDimensions() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColour() {
  return colours[randomIntFromRange(0, colours.length)];
}

function Particle({ x, y, radius } = {}) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.colour = randomColour();
  this.radians = Math.random() * Math.PI * 2;
  this.velocity = 0.05;
  this.distanceFromCenter = randomIntFromRange(30, 80);
  this.lastMouse = { x: x, y: y };

  this.update = () => {
    const lastPoint = { x: this.x, y: this.y };

    this.radians += this.velocity;

    this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.1;
    this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.1;

    this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter;
    this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter;

    this.draw(lastPoint);
  };

  this.draw = lastPoint => {
    c.beginPath();
    c.strokeStyle = this.colour;
    c.lineWidth = this.radius;
    c.moveTo(lastPoint.x, lastPoint.y);
    c.lineTo(this.x, this.y);
    c.stroke();
    c.closePath();
  };
}

let particles = [];

function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = 'rgba(255, 255, 255, 0.1)';
  c.fillRect(0, 0, canvas.width, canvas.height);
  particles.forEach(particle => particle.update());
}

function init() {
  setCanvasDimensions();
  particles = [];
  for (let i = 0; i < limit; i++) {
    particles.push(new Particle({ x: canvas.width / 2, y: canvas.height / 2, radius: Math.random() * 2 + 1 }));
  }
  animate();
}

init();
