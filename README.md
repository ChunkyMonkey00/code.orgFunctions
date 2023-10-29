# code.org Functions in pure Javascript
code.org functions in pure js, this is a library for teachers/students who want to transition from code.org to pure javascript.

# Usage
to use in your program, put the following line in the `<head>` element of your HTML  
`<script src="https://cdn.jsdelivr.net/gh/ChunkyMonkey00/code.orgFunctions@main/functions.js"></script>`  

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
    <script src="https://cdn.jsdelivr.net/gh/ChunkyMonkey00/code.orgFunctions@main/functions.js"></script>
  </head>
  <body>
  </body>
</html>
```
```
document.addEventListener("DOMContentLoaded", function() {
    onEvent("btn1", "click", function() {
        setScreen("new.html");
    });
});
```  
visit examples.html for an example of how to set up usage of these functions (in HTML)  
visit examples.js for an example of how to use each function. (in javascript)
