for (let i = 1; i <= 62; i++) {
  const contentDiv = document.getElementById(`content${i}`);
  if(contentDiv==null) {
    continue;
  }
  if (i === 1) {
    contentDiv.style.display = "block";
    contentDiv.classList.add("active");
  } else {
    contentDiv.style.display = "none";
    contentDiv.classList.remove("active");
  }
}

function openNav() {
  document.getElementById("mySidenav").style.width = "150px"; /* Adjust the width to match the side-nav width */
  document.querySelector(".main-container").style.marginLeft = "165px";
  document.querySelector(".main-container").style.padding = "20px";
  document.getElementById("mySidenav").style.padding = "10px";
  document.getElementById("mySidenav").style.display = "block";
  document.querySelector(".open-button").style.display = "none"; // Hide the open button
  document.getElementById("mySidenav").style.overflowY = "scroll"; // Show the scrollbar
}
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("mySidenav").style.padding = "0";
  document.querySelector(".main-container").style.padding = "10px";
  document.querySelector(".main-container").style.marginLeft = "0px";
  document.querySelector(".open-button").style.display = "block";
  document.getElementById("mySidenav").style.overflowY = "hidden";
}
// Rest of the JavaScript for content switching (same as before)
function showContent(sectionNumber) {
  for (let i = 1; i <= 62; i++) {
    const contentDiv = document.getElementById(`content${i}`);
    if (contentDiv == null) {
      continue;
    }
    if (i === sectionNumber) {
      contentDiv.style.display = "block";
      contentDiv.classList.add("active");
    } else {
      contentDiv.style.display = "none";
      contentDiv.classList.remove("active");
    }
  }
}
