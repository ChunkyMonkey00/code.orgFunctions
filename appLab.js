/*
I just want to say, this will be an actual hell of a project. Please
for the love of God appreciate this work. I basically have to create
a new 2d rendering system for this.
*/

// library.js
var appLab = (function () {
  //Variable set-up
  var _audio;
  var _audioElements = {};

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
    return x.slice(0, -2);
  }

  function getYPosition(element) {
    let y = getProperty(element, "style.top");
    return y.slice(0, -2);
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
  function createButton(text) {
    var button = document.createElement("button");
    button.textContent = text;
    setElementPosition(button, 0, 0);
    document.body.appendChild(button);
    return button;
  }

  function createTextInput() {
    var input = document.createElement("input");
    input.type = "text";
    setElementPosition(input, 0, 0);
    document.body.appendChild(input);
    return input;
  }

  function createTextLabel(text) {
    var label = document.createElement("label");
    label.textContent = text;
    setElementPosition(label, 0, 0);
    document.body.appendChild(label);
    return label;
  }

  function createDropdown(options) {
    var select = document.createElement("select");
    options.forEach(function (optionText) {
      var option = document.createElement("option");
      option.textContent = optionText;
      select.appendChild(option);
    });
    setElementPosition(select, 0, 0);
    document.body.appendChild(select);
    return select;
  }

  function createCheckbox() {
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    setElementPosition(checkbox, 0, 0);
    document.body.appendChild(checkbox);
    return checkbox;
  }

  function createRadioButton() {
    var radio = document.createElement("input");
    radio.type = "radio";
    setElementPosition(radio, 0, 0);
    document.body.appendChild(radio);
    return radio;
  }

  function createImage(src) {
    var img = document.createElement("img");
    img.src = src;
    setElementPosition(img, 0, 0);
    document.body.appendChild(img);
    return img;
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

  // Set the active canvas
  function getActiveCanvas() {
    return c;
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
    randomNumber: randomNumber
  };

  // Return the entire library object
  return library;

})();
