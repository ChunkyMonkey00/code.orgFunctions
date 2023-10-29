/*
Function library for code.org functions (learned on code.org courses)
I noticed it was much more user friendly and i wanted to make a library
that uses their function in pure JS. Currently a WIP, not even near everything
has been implemented.

Anyways ENJOY!
*/

//Variable set-up
var audio;
var audioElements = {};

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
  audioElements[audioSrc] = audio;
  audio.play();
  return audio;
}

function playAudio(src) {
  if (audioElements[src]) {
    audioElements[src].play();
  } else {
    audioElement = makeAudio(src);
  }
}

function stopAudio(audioSrc) {
  const audioElement = audioElements[audioSrc];
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

//variable functions
function promptNum() {
var answer = prompt("Enter a number:");
while (!/^[0-9]+$/.test(answer)) {
  answer = prompt("Enter a number: ");
}
return answer;
}

function insertItem(list, index, item) {
  if(isNaN(index)) {
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
  object[key]=value;
}

//Math
//Math functions
function randomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
