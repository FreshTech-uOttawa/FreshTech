const fridgeContainer = document.querySelector(".fridge-container");
const screen = document.querySelector(".screen");
const beginBtn = document.querySelector(".begin-simulation-btn");

function beginSimulation() {
  beginBtn.style.display = "none";
  fridgeContainer.classList.add("fridge-animation");
  setTimeout(() => {
    screen.style.display = "flex";
  }, 3000);

  //TODO: Fade out button
}
