let sound, fft, particles = [];
let playing = false;

function preload() {
  sound = loadSound('https://soundcloud.com/sebald1105/alternative-outro-lucki-instrumental');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  sound.loop();
  sound.pause();
  fft = new p5.FFT();
}

function draw() {
  background(30, 50, 30);
  let spectrum = fft.analyze();

  // Draw particles
  if (playing) {
    for (let i = 0; i < 5; i++) {
      particles.push(new Particle());
    }
  }

  particles.forEach((p, index) => {
    p.update(spectrum[100]); // React to a specific frequency
    p.show();
    if (p.isOffScreen()) {
      particles.splice(index, 1);
    }
  });
}

// Particle class
class Particle {
  constructor() {
    this.x = random(width);
    this.y = height;
    this.size = random(5, 10);
    this.speed = random(1, 5);
    this.alpha = 255;
  }

  update(energy) {
    this.y -= this.speed + energy * 0.1;
    this.alpha -= 5;
  }

  isOffScreen() {
    return this.y < 0 || this.alpha <= 0;
  }

  show() {
    noStroke();
    fill(0, 255, 0, this.alpha);
    ellipse(this.x, this.y, this.size);
  }
}

// Toggle sound
document.getElementById('toggle-sound').addEventListener('click', () => {
  playing = !playing;
  if (playing) {
    sound.play();
  } else {
    sound.pause();
  }
});
