let sound, fft, particles = [];
let playing = false;

function preload() {
  // Load the sound file
  sound = loadSound('https://ia801706.us.archive.org/14/items/nintendo-3ds-original-soundtrack/1-01.%20Initial%20Setup.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  fft = new p5.FFT();

  // Ensure sound is not played on load
  sound.setVolume(0.5);
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

  // Instruction text
  fill(255);
  textAlign(CENTER, CENTER);
  text("Click 'Toggle Sound' to play the music.", width / 2, height - 50);
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
    if (!sound.isPlaying()) {
      sound.loop();
    }
  } else {
    sound.pause();
  }
});
