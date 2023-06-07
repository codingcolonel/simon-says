// SET UP CANVAS AND 2D GRAPHICS CONTEXT
// CHANGE SIZE
let cnv = document.querySelector('canvas');
let ctx = cnv.getContext('2d');
cnv.width = 800;
cnv.height = 600;

// SEQUENCE ARRAY
let sequence = [];

// GLOBAL VARIABLES
var mouseX = null;
var mouseY = null;
var boundingRect = cnv.getBoundingClientRect();
var score = 0;
var blue = false;
var yellow = false;
var red = false;
var green = false;
var interval = 625;
var interval2 = 250;
var promise = Promise.resolve();
var tempvar = true;
var isFlashing = false;
var counter = 0;
var blueClicked = false;
var yellowClicked = false;
var redClicked = false;
var greenClicked = false;

window.requestAnimationFrame(update);
function update() {
  // HELPER FUNCTION
  draw();

  // console.log("x" + mouseX);
  // console.log("y" + mouseY);
  // console.log(interval);
  // console.log(isFlashing);

  // REQUEST ANIMATION FRAME
  window.requestAnimationFrame(update);
}

function draw() {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  if (blue == false) {
    ctx.fillStyle = 'dodgerblue';
    ctx.fillRect(100, 50, 200, 200);
  }

  if (blue == true) {
    ctx.fillStyle = 'mediumblue';
    ctx.fillRect(100, 50, 200, 200);
    setTimeout(function clearBlue() {
      blue = false;
    }, interval2);
  }

  if (blueClicked == true) {
    ctx.lineWidth = 5;
    ctx.strokeRect(100, 50, 200, 200);
  }

  if (yellow == false) {
    ctx.fillStyle = 'gold';
    ctx.fillRect(500, 50, 200, 200);
  }

  if (yellow == true) {
    ctx.fillStyle = 'goldenrod';
    ctx.fillRect(500, 50, 200, 200);
    setTimeout(function clearYellow() {
      yellow = false;
    }, interval2);
  }

  if (yellowClicked == true) {
    ctx.lineWidth = 5;
    ctx.strokeRect(500, 50, 200, 200);
  }

  if (red == false) {
    ctx.fillStyle = 'red';
    ctx.fillRect(100, 350, 200, 200);
  }

  if (red == true) {
    ctx.fillStyle = 'darkred';
    ctx.fillRect(100, 350, 200, 200);
    setTimeout(function clearRed() {
      red = false;
    }, interval2);
  }

  if (redClicked == true) {
    ctx.lineWidth = 5;
    ctx.strokeRect(100, 350, 200, 200);
  }

  if (green == false) {
    ctx.fillStyle = 'forestgreen';
    ctx.fillRect(500, 350, 200, 200);
  }

  if (green == true) {
    ctx.fillStyle = 'darkgreen';
    ctx.fillRect(500, 350, 200, 200);
    setTimeout(function clearGreen() {
      green = false;
    }, interval2);
  }

  if (greenClicked == true) {
    ctx.lineWidth = 5;
    ctx.strokeRect(500, 350, 200, 200);
  }

  ctx.font = '40px Monospace';
  ctx.fillStyle = 'black';
  ctx.fillText(score, 385, 585);
}

// RUN FIRST SEQUENCE ON START
function startUp() {
  addColor();
  addColor();
  startSequence();
}

// GET MOUSE POSITION
document.querySelector('canvas').addEventListener('mouseup', getXYPosition);
function getXYPosition(event) {
  if (isFlashing == false) {
    mouseX = event.clientX - boundingRect.left;
    mouseY = event.clientY - boundingRect.top;
    logic();
    // console.log("click");
  }
}

function logic() {
  // DETERMINE COLOR CLICKED AND CORRECT
  if (mouseX >= 100 && mouseX <= 300 && mouseY >= 50 && mouseY <= 250) {
    if (sequence.at(counter) === 'blue') {
      counter++;
    } else {
      counter = -1;
    }
    blueClicked = true;
  } else if (mouseX >= 500 && mouseX <= 700 && mouseY >= 50 && mouseY <= 250) {
    if (sequence.at(counter) === 'yellow') {
      counter++;
    } else {
      counter = -1;
    }
    yellowClicked = true;
  } else if (mouseX >= 100 && mouseX <= 300 && mouseY >= 350 && mouseY <= 550) {
    if (sequence.at(counter) === 'red') {
      counter++;
    } else {
      counter = -1;
    }
    redClicked = true;
  } else if (mouseX >= 500 && mouseX <= 700 && mouseY >= 350 && mouseY <= 550) {
    if (sequence.at(counter) === 'green') {
      counter++;
    } else {
      counter = -1;
    }
    greenClicked = true;
  }

  // // UPDATE SCORE IF CORRECT
  if (counter == sequence.length) {
    counter = 0;
    score = sequence.length;
    startSequence();
  }

  // RESET IF INCORECT
  if (counter === -1) {
    alert('game over');
  }

  // RESET VARIABLES
  setTimeout(function resetVar() {
    blueClicked = false;
    redClicked = false;
    yellowClicked = false;
    greenClicked = false;
  }, interval2);

  // RESET MOUSE X+Y
  mouseX = null;
  mouseY = null;
}

function startSequence() {
  addColor();
  isFlashing = true;
  sequence.forEach(function (element, index) {
    promise = promise.then(function () {
      if (element == 'blue') {
        blue = true;
        // console.log("b");
      } else if (element == 'yellow') {
        yellow = true;
        // console.log("y");
      } else if (element == 'red') {
        red = true;
        // console.log("r");
      } else if (element == 'green') {
        green = true;
        // console.log("g");
      }
      // CHECK IF IT'S THE LAST ITEM IN ARRAY
      if (index == sequence.length - 1) {
        setTimeout(function changeVariable() {
          isFlashing = false;
        }, 500);
      }
      return new Promise(function (resolve) {
        setTimeout(resolve, interval);
      });
    });
  });
}

function addColor() {
  let ranNum = Math.random();
  // PICK RANDOM COLOR
  if (ranNum < 0.25) {
    sequence.push('blue');
  } else if (ranNum > 0.75) {
    sequence.push('yellow');
  } else if (ranNum >= 0.25 && ranNum < 0.5) {
    sequence.push('red');
  } else {
    sequence.push('green');
  }
}
