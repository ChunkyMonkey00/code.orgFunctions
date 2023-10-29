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

/* Usage of each function
onEvent("btn", "click", function () {
  console.log(getProperty("btn", "text"));
  console.log(getText("label1"));
  console.log(randomNumber(-1, 2));
  setProperty("btn", "text", "Clicked!");
  setProperty("btn", "background-color", "red");
  setText("label1", "Text Updated!");
  console.log(getNumber("input1"));
  setNumber("input1", 21);
  console.log(getChecked("input2"));
  setChecked("input2", true);
  console.log(getImageURL("image1"));
  setImageURL("image1", "data:image/png;base64,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");
  hideElement("label2");
  deleteElement("label3");
  setPosition("box1", 200, 50, 100, 150);
  console.log(getXPosition("box1"));
  console.log(getYPosition("box1"));
  setSize("box2", 50, 50);
  write("hi!");
  openWindow("https://www.google.com/search?client=avast-a-1&q=open+link+in+new+tap+js&oq=open+link+in+new+tap+js&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIECAEQADIECAIQADIECAMQADIECAQQADIECAUQADIECAYQADIECAcQANIBCDQwMDhqMGoxqAIAsAIA&ie=UTF-8");
  createButton("Click Me");
  createTextInput();
  createTextLabel("Label Text");
  createDropdown(["Option 1", "Option 2", "Option 3"]);
  createCheckbox();
  createRadioButton();
  createImage("image.jpg");
  console.log(promptNum());
  var array = [1, 2, 3];
  insertItem(array, 1, "Hi");
  console.log(array);
  appendItem(array, "hi2");
  console.log(array);
  removeItem(array, 1);
  console.log(array);
  var obj = {"key":123};
  console.log(getValue(obj, "key"));
  addPair(obj, "key2", 1234);
  console.log(obj);
});
*/

/*Theoretically (but not tested) possible functions
setScreen("game.html");
setScreen("https://google.com");
playAudio("your_audio.mp3");
stopAudio("your_audio.mp3");
*/
