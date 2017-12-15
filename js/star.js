// STAR FIELD
let canvas = document.getElementById("canvas");
let c = canvas.getContext("2d");

//Any number between 1000 and 5000 is fine as long as the frames don't slow
let numStars = 1000;
//this is necessary to help start the project
let focalLength = canvas.width;

//Creating values for later use
let centerX, centerY;

//Same with said above, and arrays will be necessary here for multiple stars to be created
let stars = [], star;

//i is here to help avoid writing in i everytime a for loop is used
let i;

//Doesn't let the animation start until said otherwise!
let animate = false;

//Calling the function
initializeStars();

//Allows the frames, or the stars and colors to be able to move
function executeFrame() {
    if (animate)
        requestAnimFrame(executeFrame);
    moveStars();
    drawStars();
}

function initializeStars() {

    //Sets the star to be created at the center of the screen
    centerX = canvas.width / 2;
    centerY = canvas.height / 2;

    stars = [];
    for (i = 0; i < numStars; i++) {
        star = {
            //x, y, and z are set at different postions
            //  z is special since it can helps create a sense of depth
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            z: Math.random() * canvas.width
        };
        stars.push(star);
    }
}

let zRandom = Math.floor((Math.random() * 10) + 1);
function moveStars() {
    //Creates the stars and assigns each star/dot to a random position when starting.
    for (i = 0; i < numStars; i++) {
        star = stars[i];
        star.z = star.z - zRandom;

        if (star.z <= 0) {
            star.z = canvas.width;
        }
    }
}

function drawStars() {
    let pixelX, pixelY, pixelRadius;

    // Resize to the screen
    if (canvas.width != window.innerWidth || canvas.width != window.innerWidth) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initializeStars();
    }

    //Picks a random color for every frame
    let hue = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';

    //Fills the background as a black color
    c.fillStyle = "black";
    //Fills in the entire page
    c.fillRect(0, 0, canvas.width, canvas.height);

    //Fills in the dots/radius
    c.fillStyle = hue;
    for (i = 0; i < numStars; i++) {
        star = stars[i];

        //The pixels actually refers to the path that it's traveling along to
        pixelX = (star.x - centerX) * (focalLength / star.z);
        pixelX += centerX;
        pixelY = Math.floor((Math.random() * 5) + 1) * (focalLength / star.z);
        pixelY += centerY;

        //Allows the pixels to have different sizes when traveling
        pixelRadius = Math.floor((Math.random() * 5) + 1) * (focalLength / star.z);

        c.beginPath();
        c.arc(pixelX, pixelY, pixelRadius, 0, 2 * Math.PI);
        c.fill();
    }
}

// Starts the animation when the mouse enters the canvas
//For mobile users, they will have to tap the screen
canvas.addEventListener('mouseover', function (e) {
    animate = true;
    executeFrame();
});

// Pauses the animation when the mouse exits the canvas
//Mobile users have to tap anywhere besides the canvas to stop the animation
canvas.addEventListener("mouseout", function (e) {
    mouseDown = false;
    animate = false;
});

// Draw the first frame to start animation
executeFrame();

//This is necessary in order to get the animation to start!
// shim layer with setTimeout fallback
// from http://paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();