let dvdX, dvdY, dvdVX, dvdVY, dvdSpeed;
const isMobile = /Mobi|Android/i.test(navigator.userAgent);

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  colorMode(HSB, 360, 100, 100, 100);
  background(0, 0, 200);

  // Initialize DVD logo position and velocity
  dvdX = random(width);
  dvdY = random(height);
  dvdSpeed = isMobile ? 3 : 5;
  setRandomVelocity();
}

function draw() {
  applyFadingEffect();
  drawCenterBox();
  drawEllipse();
  if (isMobile) updateDvdPosition();
}

function applyFadingEffect() {
  rectMode(CORNER);
  colorMode(RGB, 255, 255, 255, 255);
  fill(255, 255, 255, 25);
  rect(0, 0, width, height);
}

function drawCenterBox() {
  rectMode(CENTER);
  fill(0, 0, 0, 255);
  const boxW = windowWidth * 0.6;
  const boxH = windowHeight * 0.6;
  
}

function drawEllipse() {
  colorMode(HSB, 360, 100, 100, 100);
  const t = millis() / 1000;
  const beat = sin((TWO_PI / 5) * t); // 5 seconds cycle time
  const size = map(beat, -1, 1, 25, 50);
  const hueValue = (t * 60) % 360;

  fill(hueValue, 100, 100);
  if (isMobile) {
    ellipse(dvdX, dvdY, size);
  } else {
    ellipse(mouseX, mouseY, size);
  }
}

function updateDvdPosition() {
  dvdX += dvdVX;
  dvdY += dvdVY;

  // Bounce off walls
  if (dvdX <= 0 || dvdX >= width) dvdVX *= -1;
  if (dvdY <= 0 || dvdY >= height) dvdVY *= -1;
}

function touchStarted() {
  if (isMobile) {
    dvdX = mouseX;
    dvdY = mouseY;
    setRandomVelocity();
  }
}

function setRandomVelocity() {
  const angle = random(TWO_PI);
  dvdVX = dvdSpeed * cos(angle);
  dvdVY = dvdSpeed * sin(angle);
}
