const fridgeContainer = document.querySelector(".fridge-container");
const screen = document.querySelector(".screen");
const beginBtn = document.querySelector(".begin-simulation-btn");

function beginSimulation() {
  //TODO: Probably make it quick and subtle
  // It should take away the focus from the background and the user shouldnt directly noticed the background fade
  // Could see the fridge all the time and just zoom on start
  // Could make the stars go to the left and make the fridge appear from the right
  // Could make the stars go forward and grow the fridge from the middle? (It should be quick)
  // Could make a really bright star in the middle and it will look like we are going to that star when going forward
  // and the star will be the fridge? ** Seems good, but hard
  beginBtn.style.display = "none";
  fridgeContainer.classList.add("fridge-animation");
  setTimeout(() => {
    screen.style.display = "flex";
  }, 3000);

  //TODO: Fade out button
}
