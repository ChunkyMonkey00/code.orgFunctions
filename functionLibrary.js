/*
I just want to say, this will be an actual hell of a project. Please
for the love of God appreciate this work. I basically have to create
a new 2d rendering system for this.
*/

/* start of game lab section */

var labs = (function () {

  //Variable set-up
  var _audio;
  var _audioElements = {};
  var _c;
  var _canv;
  var _canvas;
  var _ctx;

  //Setup functions (not in code.org, but i use them to make this library)
  function getElem(id) {
    return document.getElementById(id);
  }


  function setElementPosition(element, x, y) {
    element.style.position = "absolute";
    element.style.left = x + "px";
    element.style.top = y + "px";
  }

  //UI control
  //HTML element functions
  function onEvent(elem, event, func) {
    var id = getElem(elem);
    id.addEventListener(event, func);
  }

  function setProperty(elem, prop, val) {
    var id = getElem(elem);
    if (id && prop) {
      if (prop.startsWith("style.")) {
        var styleProp = prop.substring(6); // Remove "style." prefix
        id.style[styleProp] = val;
      } else {
        id[prop] = val;
      }
    }
  }


  function getProperty(element, property) {
    element = getElem(element);
    if (property === "text") {
      return element.textContent;
    }
    if (element && property) {
      if (property === "checked") {
        return element.checked;
      }
      if (property.startsWith("style.")) {
        var styleProp = property.substring(6); // Remove "style." prefix
        return element.style[styleProp];
      }
      if (element.hasOwnProperty(property)) {
        return element[property];
      } else if (element.getAttribute) {
        return element.getAttribute(property);
      } else if (element.style) {
        return element.style.getPropertyValue(property);
      }
    }
  }

  function getText(element) {
    return getProperty(element, "text");
  }

  function setText(element, val) {
    setProperty(element, "text", val);
  }

  function getNumber(element) {
    return getProperty(element, "value");
  }

  function setNumber(element, val) {
    setProperty(element, "value", val);
  }

  function getChecked(element) {
    return getProperty(element, "checked");
  }

  function setChecked(element, val) {
    if (val || !val) {
      setProperty(element, "checked", val);
    } else {
      throw new Error("Please only use true/false for setChecked");
    }
  }

  function getImageURL(element) {
    return getProperty(element, "src");
  }

  function setImageURL(element, val) {
    setProperty(element, "src", val);
  }

  function makeAudio(audioSrc) {
    const audio = new Audio(audioSrc);
    _audioElements[audioSrc] = audio;
    audio.play();
    return audio;
  }

  function playAudio(src) {
    if (_audioElements[src]) {
      _audioElements[src].play();
    } else {
      audioElement = makeAudio(src);
    }
  }

  function stopAudio(audioSrc) {
    const audioElement = _audioElements[audioSrc];
    if (audioElement && !audioElement.paused) {
      audioElement.pause();
      audioElement.currentTime = 0;
    }
  }

  function showElement(element) {
    setProperty(element, "visibility", "visible")
  }

  function hideElement(element) {
    setProperty(element, "visibility", "hidden")
  }

  function deleteElement(element) {
    getElem(element).remove();
  }

  function setPosition(element, x, y, width, height) {
    setProperty(element, "style.position", "absolute");
    setProperty(element, "style.top", y + "px");
    setProperty(element, "style.left", x + "px");
    setProperty(element, "style.width", width + "px");
    setProperty(element, "style.height", height + "px");
  }

  function setSize(element, width, height) {
    setProperty(element, "style.width", width + "px");
    setProperty(element, "style.height", height + "px");
  }

  function write(text) {
    var textElement = document.createElement("p");
    textElement.innerHTML = text;
    document.body.appendChild(textElement);
  }

  function getXPosition(element) {
    let x = getProperty(element, "style.left");
    return Number(x.slice(0, -2));
  }

  function getYPosition(element) {
    let y = getProperty(element, "style.top");
    return Number(y.slice(0, -2));
  }

  //Be careful with this one. I havent tested it yet, it should just change the html file or tab
  function setScreen(fileORurl) {
    location.replace(fileORurl)
  }

  //HAD TO RENAME THIS ONE (originally open()) BECAUSE JS HAS A FUNCTION, OPEN. bs.
  function openWindow(URL) {
    window.open(URL, '_blank');
  }

  //Finally, create elements sections. I may have cheated on these one :(
  function createButton(id, text) {
  var button = document.createElement("button");
  button.id = id;
  button.textContent = text;
  setElementPosition(button, 0, 0);
  document.body.appendChild(button);
  return button;
}

function createTextInput(id) {
  var input = document.createElement("input");
  input.id = id;
  input.type = "text";
  setElementPosition(input, 0, 0);
  document.body.appendChild(input);
  return input;
}

function createTextLabel(id, text) {
  var label = document.createElement("label");
  label.id = id;
  label.textContent = text;
  setElementPosition(label, 0, 0);
  document.body.appendChild(label);
  return label;
}

function createDropdown(id, options) {
  var select = document.createElement("select");
  select.id = id;
  options.forEach(function (optionText) {
    var option = document.createElement("option");
    option.textContent = optionText;
    select.appendChild(option);
  });
  setElementPosition(select, 0, 0);
  document.body.appendChild(select);
  return select;
}

function createCheckbox(id) {
  var checkbox = document.createElement("input");
  checkbox.id = id;
  checkbox.type = "checkbox";
  setElementPosition(checkbox, 0, 0);
  document.body.appendChild(checkbox);
  return checkbox;
}

function createRadioButton(id) {
  var radio = document.createElement("input");
  radio.id = id;
  radio.type = "radio";
  setElementPosition(radio, 0, 0);
  document.body.appendChild(radio);
  return radio;
}

function createImage(id, src) {
  var img = document.createElement("img");
  img.id = id;
  img.src = src;
  setElementPosition(img, 0, 0);
  document.body.appendChild(img);
  return img;
}


  // Canvas functions
  // These functions work with the HTML5 canvas element.

  // Create a canvas element
  function createCanvas(id, width, height) {
    _canvas = document.createElement("canvas");
    _canvas.id = id || "";
    _canvas.width = width || 100;
    _canvas.height = height || 100;
    setElementPosition(_canvas, 0, 0);
    document.body.appendChild(_canvas);
    return _canvas;
  }

  // Set the active canvas
  function setActiveCanvas(id) {
    _c = getElem(id);
    _ctx = _c.getContext('2d');
  }

  // Set the active canvas
  function getActiveCanvas() {
    return _c;
  }

  // Draw a line on the canvas
  function line(x1, y1, x2, y2) {
   _ctx.beginPath();
   _ctx.moveTo(x1, y1);
   _ctx.lineTo(x2, y2);
   _ctx.stroke();
  }

  // Set the fill color for canvas drawing
  function setFillColor(color) {
   _ctx.fillStyle = color;
  }

  // Draw a filled circle on the canvas
  function circle(x, y, radius) {
   _ctx.beginPath();
   _ctx.arc(x, y, radius, 0, 2 * Math.PI);
   _ctx.fill();
   _ctx.closePath();
  }

  // Draw a filled rectangle on the canvas
  function rect(x, y, width, height) {
    _ctx.fillRect(x, y, width, height);
  }

  // Set the stroke width for canvas drawing
  function setStrokeWidth(width) {
    _ctx.lineWidth = width;
  }

  // Set the stroke color for canvas drawing
  function setStrokeColor(color) {
    _ctx.strokeStyle = color;
  }

  // Draw an image on the canvas from a URL
  function drawImageURL(url) {
    var img = new Image();
    img.src = url;
    img.onload = function () {
      _ctx.drawImage(img, 0, 0);
    };
  }

  // Clear the canvas
  function clearCanvas() {
    _ctx.clearRect(0, 0, _c.width, _c.height);
  }

  // Get image data
  function getImageDataAt(x, y, width, height) {
    return _ctx.getImageData(x, y, width, height);
  }

  // Put image data
  function putImageDataAt(imgData, x, y) {
    _ctx.putImageData(imgData, x, y);
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

  var World = {
    allSprites: {},
    width: window.innerWidth,
    height: window.innerHeight,
    mouseX: 0,
    mouseY: 0,
    frameRate: 30,
    frameCount: 0,
    isDrawing: false,
    animationFrameId: null,
    canvas: _c,
    context: _ctx,
    customDrawFunction: null,
    startTime: 0,
    frameStartTime: 0,
    seconds: 0,
  };

  function startDrawing(customDrawFunction) {
    if (!World.isDrawing) {
      World.isDrawing = true;
      World.context = _ctx;
      World.frameCount = 0;
      World.customDrawFunction = customDrawFunction;
      World.startTime = performance.now();
      drawFrame();
    }
  }

  function stopDrawing() {
    if (World.isDrawing) {
      World.isDrawing = false;
      cancelAnimationFrame(World.animationFrameId);
    }
  }

  function drawFrame() {
    World.canvas = _c;
    World.context = _ctx;

    var currentTime = performance.now();
    var elapsedMilliseconds = currentTime - World.frameStartTime;
    var elapsedSeconds = elapsedMilliseconds / 1000;

    if (elapsedSeconds >= 1 / World.frameRate) {
      World.frameStartTime = currentTime;

      // Your existing drawing code here
      // This function represents one frame of your animation

      if (typeof World.customDrawFunction === "function") {
        World.customDrawFunction(); // Execute the user's custom draw function
      }

      World.frameCount++;

      // Update World.seconds within the frame
      World.seconds = Math.round((currentTime - World.startTime) / 1000);
    }

    if (World.isDrawing) {
      World.animationFrameId = requestAnimationFrame(drawFrame);
    }
  }





/* users can call the draw() function with the following code:

function draw() {
  //user code here
}

labs.startDrawing(draw);

*/

document.onmousemove = handleMouseMove;
function handleMouseMove(event) {
  World.mouseX=event.clientX;
  World.mouseY=event.clientY;
}

/* What to implement:

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

  var library = {
    _audio: _audio,
    _audioElements: _audioElements,
    getElem: getElem,
    setElementPosition: setElementPosition,
    onEvent: onEvent,
    setProperty: setProperty,
    getProperty: getProperty,
    getText: getText,
    setText: setText,
    getNumber: getNumber,
    setNumber: setNumber,
    getChecked: getChecked,
    setChecked: setChecked,
    getImageURL: getImageURL,
    setImageURL: setImageURL,
    makeAudio: makeAudio,
    playAudio: playAudio,
    stopAudio: stopAudio,
    showElement: showElement,
    hideElement: hideElement,
    deleteElement: deleteElement,
    setPosition: setPosition,
    setSize: setSize,
    write: write,
    getXPosition: getXPosition,
    getYPosition: getYPosition,
    setScreen: setScreen,
    openWindow: openWindow,
    createButton: createButton,
    createTextInput: createTextInput,
    createTextLabel: createTextLabel,
    createDropdown: createDropdown,
    createCheckbox: createCheckbox,
    createRadioButton: createRadioButton,
    createImage: createImage,
    createCanvas: createCanvas,
    setActiveCanvas: setActiveCanvas,
    getActiveCanvas: getActiveCanvas,
    line: line,
    setFillColor: setFillColor,
    circle: circle,
    rect: rect,
    setStrokeWidth: setStrokeWidth,
    setStrokeColor: setStrokeColor,
    drawImageURL: drawImageURL,
    clearCanvas: clearCanvas,
    getImageDataAt: getImageDataAt,
    putImageDataAt: putImageDataAt,
    getRed: getRed,
    getGreen: getGreen,
    getBlue: getBlue,
    setRed: setRed,
    setGreen: setGreen,
    setBlue: setBlue,
    setAlpha: setAlpha,
    setRGB: setRGB,
    promptNum: promptNum,
    insertItem: insertItem,
    appendItem: appendItem,
    removeItem: removeItem,
    getValue: getValue,
    addPair: addPair,
    randomNumber: randomNumber,
    World: World,
    startDrawing: startDrawing,
    stopDrawing: stopDrawing,
  };

  // Return the entire library object
  return library;

})();
