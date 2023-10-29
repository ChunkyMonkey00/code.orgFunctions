# Notice
Not all function names/uses are exactly the same, please look at examples.js to see what changed  
  
# code.org Functions in pure Javascript
code.org functions in pure js, this is a library for teachers/students who want to transition from code.org to pure javascript.

# App Lab Usage
to use in your program, put the following line in the `<head>` element of your HTML  
`<script src="https://cdn.jsdelivr.net/gh/ChunkyMonkey00/code.orgFunctions@main/appLab.js"></script>`  

and make sure you put in  
```
document.addEventListener("DOMContentLoaded", function() {
    // Your code here
});
```
to ensure that the javascript library can load before you call any of its functions.
  

  EX: 
```
<!DOCTYPE HTML>
<html>
  <head>
    <script src="https://cdn.jsdelivr.net/gh/ChunkyMonkey00/code.orgFunctions@main/appLab.js"></script>
  </head>
  <body>
      <button id="btn2">Click Me!</button>
  </body>
</html>
```
```
document.addEventListener("DOMContentLoaded", function() {
    onEvent("btn1", "click", function() {
        appLab.setScreen("new.html");
    });
});
```  
visit appLabExamples.html for an example of how to set up usage of these functions (in HTML)  
visit appLabExamples.js for an example of how to use each function. (in javascript)
