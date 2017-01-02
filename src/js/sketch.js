var s;
var scl = 20;

var food;
var keyChecked = false;

function setup() {
  createCanvas(340, 340);
  s = new Snake();
  frameRate(7);
  pickLocation();
}

function pickLocation() {
  var cols = floor(width/scl);
  var rows = floor(height/scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}

/* debug cheat
function mousePressed() {
  s.total++;
}*/

function draw() {
  background(51);

  if (s.eat(food)) {
    pickLocation();
  }
  s.death();
  s.update();
  s.show();
  keyChecked = false;

  fill(255, 0, 100);
  rect(food.x, food.y, scl, scl);
}

function keyPressed() {
  if(!keyChecked){
    if (keyCode === UP_ARROW && s.yspeed != 1) {
      s.dir(0, -1);
    } else if (keyCode === DOWN_ARROW && s.yspeed != -1) {
      s.dir(0, 1);
    } else if (keyCode === RIGHT_ARROW && s.xspeed != -1) {
      s.dir(1, 0);
    } else if (keyCode === LEFT_ARROW && s.xspeed != 1) {
      s.dir(-1, 0);
    }
    keyChecked = true;
  }
}
