//  BOUNCING BALL
//CREATING THE LAYOUT DESIGN
// defines width and height
let width = 400, height = 300;

let pong = document.getElementById("pong");

// create SVG document and set its size
let draw = SVG('pong').size(width, height);

let background = draw.rect(width, height).fill('#e3e8e6');

//define ball size
let ballSize = 30;

let firstColor = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';

let secondColor = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';

let thirdColor = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
//Create the ball
let ball = draw.circle(ballSize);
ball.center(width / 2, height / 2).fill(firstColor);

//Moevement LOGIC
// Create and set a random velocity for the ball at the start
let vx = Math.random() * 500 - 250,
  vy = Math.random() * 500 - 250;


//Update is called on for every animation step
function update(dt) {


  //Move the ball by its velocity
  ball.dmove(vx * dt, vy * dt);

  // Get postion of ball
  let cx = ball.cx(),
    cy = ball.cy();

  // Checks to see if it hits the top/bottom borders
  if ((vy < 0 && cy <= 0) || (vy > 0 && cy >= height)) {
    vy = -vy;
  }

  //Checks to see if the ball hits the paddle
  if ((vx < 0 && cx <= 0) ||
    (vx > 0 && cx >= width)) {
    // Depending on where the ball hits, the y velocity is adjusted
    //More math is required here
    vy = (cy - ((vx < 0 ? 0 : height))) * 7; //Magic factor

    //Make the ball faster upon hit
    vx = -vx * 1.05;
  }

  ball.fill(ballColor.at(1 / width * ball.x()));
}

let lastTime, animFrame;

function callback(ms) {
  if (lastTime) {
    update((ms - lastTime) / 1000); // Calls, updates and passes the delta time in seconds
  }

  lastTime = ms;
  animFrame = requestAnimationFrame(callback);
}

callback();

let ballColor = new SVG.Color(secondColor);

ballColor.morph(thirdColor);

/*
// Starts the animation when the mouse enters the canvas
//For mobile users, they will have to tap the screen
pong.addEventListener('mouseover', function (e) {
  animate = true;
  executeFrame();
});

// Pauses the animation when the mouse exits the canvas
//Mobile users have to tap anywhere besides the canvas to stop the animation
pong.addEventListener("mouseout", function (e) {
  mouseDown = false;
  animate = false;
});
*/