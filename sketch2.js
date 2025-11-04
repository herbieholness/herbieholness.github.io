let isDarkMode = 0;

let toggleBtn;
let bluemode = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  toggleBtn = createImg('moon.png', 'Toggle dark mode');
  toggleBtn.id('toggle-btn');
  toggleBtn.size(200, 200);
  toggleBtn.position(20, 20);
  toggleBtn.mousePressed(toggleMode);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  colorMode(RGB);
  if (isDarkMode === 0) {
    bluemode = false;
    fill(20, 20, 20, 10); 
  } else if (isDarkMode === 1) {
    bluemode = false;
    fill(255, 255, 255, 10);
  } else {
    fill(0, 0, 255, 10);
    bluemode = true;
  }

  rectMode(CORNER);
  rect(0, 0, width, height);

  colorMode(HSB, 360, 100, 100, 100);
  let t = millis() / 1000;
  let num = map(sin((TWO_PI / 5) * t), -1, 1, 25, 50);
  let hueValue = (t * 60) % 360;
  let x = mouseX || touches[0]?.x || width / 2;
  let y = mouseY || touches[0]?.y || height / 2;

  if (bluemode) {
    fill(hueValue, 0, 100);
  } else {
    fill(hueValue, 100, 100);
  }

  ellipse(x, y, num);
}

function touchMoved() {
  return false;
}

function toggleMode() {
  isDarkMode = (isDarkMode + 1) % 3;
  console.log("Mode:", isDarkMode);

  if (isDarkMode === 0) {
    toggleBtn.elt.src = 'moon.png';
    removeDarkMode();
  } else if (isDarkMode === 1) {
    toggleBtn.elt.src = 'sun.png';
    applyDarkMode();
  } else {
    toggleBtn.elt.src = 'blue moon.png';
    removeDarkMode();
  }

  console.log("Dark mode active:", document.body.classList.contains('dark-mode'));
}

function applyDarkMode() {
  document.body.classList.add('dark-mode');
  document.getElementById('link')?.classList.add('dark-mode');
  document.getElementById('subsubtitle')?.classList.add('dark-mode');
}

function removeDarkMode() {
  document.body.classList.remove('dark-mode');
  document.getElementById('link')?.classList.remove('dark-mode');
  document.getElementById('subsubtitle')?.classList.remove('dark-mode');
}
