
/*
I just want to say, this will be an actual hell of a project. Please
for the love of God appreciate this work. I basically have to create
a new 2d rendering system for this.
*/

//Setup functions (not in code.org, but i use them to make this library)
function getElem(id) {
  return document.getElementById(id);
}


function setElementPosition(element, x, y) {
  element.style.position = "absolute";
  element.style.left = x + "px";
  element.style.top = y + "px";
}

// Canvas functions
// These functions work with the HTML5 canvas element.

// Create a canvas element
function createCanvas(id, width, height) {
  var canvas = document.createElement("canvas");
  canvas.id = id || "";
  canvas.width = width || 100;
  canvas.height = height || 100;
  setElementPosition(canvas, 0, 0);
  document.body.appendChild(canvas);
  return canvas;
}

// Set the active canvas
function setActiveCanvas(id) {
  c = getElem(id);
  ctx = c.getContext('2d');
}

// Draw a line on the canvas
function line(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

// Set the fill color for canvas drawing
function setFillColor(color) {
  ctx.fillStyle = color;
}

// Draw a filled circle on the canvas
function circle(x, y, radius) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();
}

// Draw a filled rectangle on the canvas
function rect(x, y, width, height) {
  ctx.fillRect(x, y, width, height);
}

// Set the stroke width for canvas drawing
function setStrokeWidth(width) {
  ctx.lineWidth = width;
}

// Set the stroke color for canvas drawing
function setStrokeColor(color) {
  ctx.strokeStyle = color;
}

// Draw an image on the canvas from a URL
function drawImageURL(url) {
  var img = new Image();
  img.src = url;
  img.onload = function () {
    ctx.drawImage(img, 0, 0);
  };
}

// Clear the canvas
function clearCanvas() {
  ctx.clearRect(0, 0, c.width, c.height);
}

// Get image data
function getImageDataAt(x, y, width, height) {
  return ctx.getImageData(x, y, width, height);
}

// Put image data
function putImageDataAt(imgData, x, y) {
  ctx.putImageData(imgData, x, y);
}

// Get the red component of a pixel
function getRed(imgData, x, y) {
  var index = (y * imgData.width + x) * 4;
  return imgData.data[index];
}

// Get the green component of a pixel
function getGreen(imgData, x, y) {
  var index = (y * imgData.width + x) * 4 + 1;
  return imgData.data[index];
}

// Get the blue component of a pixel
function getBlue(imgData, x, y) {
  var index = (y * imgData.width + x) * 4 + 2;
  return imgData.data[index];
}

// Set the red component of a pixel
function setRed(imgData, x, y, value) {
  var index = (y * imgData.width + x) * 4;
  imgData.data[index] = value;
}

// Set the green component of a pixel
function setGreen(imgData, x, y, value) {
  var index = (y * imgData.width + x) * 4 + 1;
  imgData.data[index] = value;
}

// Set the blue component of a pixel
function setBlue(imgData, x, y, value) {
  var index = (y * imgData.width + x) * 4 + 2;
  imgData.data[index] = value;
}

// Set the alpha component of a pixel
function setAlpha(imgData, x, y, value) {
  var index = (y * imgData.width + x) * 4 + 3;
  imgData.data[index] = value;
}

// Set the RGB components of a pixel
function setRGB(imgData, x, y, red, green, blue) {
  var index = (y * imgData.width + x) * 4;
  imgData.data[index] = red;
  imgData.data[index + 1] = green;
  imgData.data[index + 2] = blue;
}

//variable functions
function promptNum() {
  var answer = prompt("Enter a number:");
  while (!/^[0-9]+$/.test(answer)) {
    answer = prompt("Enter a number: ");
  }
  return answer;
}

function insertItem(list, index, item) {
  if (isNaN(index)) {
    throw new Error("Only use numbers for index insertItem.");
    return;
  }
  console.log(item, index);
  list.splice(index, 0, item);
}

function appendItem(list, item) {
  list.push(item);
}

function removeItem(list, index) {
  list.splice(index, 1);
}

function getValue(object, key) {
  return object[key];
}

function addPair(object, key, value) {
  object[key] = value;
}

//Math
//Math functions
function randomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

/* start of game lab section */

/* What to implement:
//Main function (start of game basically)

function draw() {

}

drawSprites();
playSpeech("Hello World!", "female", "English");
keyDown("up")
keyWentDown("up")
keyWentUp("up")
mouseDidMove()
mouseDown("leftButton")
mouseWentDown("leftButton")
mouseWentUp("leftButton")
mouseIsOver(sprite)
mousePressedOver(sprite)
showMobileControls(true, true, true, true);

//Variables

World.allSprites
World.width
World.height
World.mouseX
World.mouseY
World.frameRate
World.frameCount
World.seconds

//Back to functions

camera.on();
camera.off();
camera.isActive()
camera.mouseX
camera.mouseY
camera.x
camera.y
camera.zoom

*/

/* Collision system example:

// Demonstrate all four types of collisions.
var spriteDisplace1 = createSprite(75, 50, 50, 50);
spriteDisplace1.scale=0.75;
spriteDisplace1.velocityX=2;
var spriteDisplace2 = createSprite(250, 50, 50, 50);
spriteDisplace2.scale=0.75;
var spriteCollide1 = createSprite(75, 150, 50, 50);
spriteCollide1.scale=0.75;
spriteCollide1.velocityX=2;
var spriteCollide2 = createSprite(250, 150, 50, 50);
spriteCollide2.scale=0.75;
var spriteBounce1 = createSprite(75, 250, 50, 50);
spriteBounce1.scale=0.75;
spriteBounce1.velocityX=2;
var spriteBounce2 = createSprite(250, 250, 50, 50);
spriteBounce2.scale=0.75;
var spriteBounceOff1 = createSprite(75, 350, 50, 50);
spriteBounceOff1.scale=0.75;
spriteBounceOff1.velocityX=2;
var spriteBounceOff2 = createSprite(250, 350, 50, 50);
spriteBounceOff2.scale=0.75;
function draw() {
  background("white");
  spriteDisplace1.displace(spriteDisplace2);
  spriteCollide1.collide(spriteCollide2);
  spriteBounce1.bounce(spriteBounce2);
  spriteBounceOff1.bounceOff(spriteBounceOff2);
  drawSprites();
}

*/
