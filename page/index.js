// JavaScript for the image slider
const images = document.querySelectorAll(".image-slider img");
const bubbles = document.querySelectorAll(".bubble");

let currentImageIndex = 0;
let userClicked = false;

// Function to show a specific image and update bubbles
function showImage(index) {
  images[currentImageIndex].classList.remove("active");
  bubbles[currentImageIndex].classList.remove("active");
  currentImageIndex = index;
  images[currentImageIndex].classList.add("active");
  bubbles[currentImageIndex].classList.add("active");
  userClicked = true;
  setTimeout(function(){userClicked=false;}, 5000);
}

// Event listeners for bubble clicks
bubbles.forEach((bubble, index) => {
  bubble.addEventListener("click", () => {
    showImage(index);
  });
});

// Automatic image slider (optional)
setInterval(() => {
  if(!userClicked) {
  const nextIndex = (currentImageIndex + 1) % images.length;
  showImage(nextIndex);
  }
}, 5000); // Change images every 3 seconds (adjust as needed)
