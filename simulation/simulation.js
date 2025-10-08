const screen = document.querySelector(".screen");
const beginBtn = document.querySelector(".begin-simulation-btn");
const frigoContainer = document.querySelector(".frigo-container");
const frigo = document.querySelector(".frigo");
const star_logo = document.querySelector(".star_logo");
const screenInteract = document.querySelector(".interactable");

async function beginSimulation() {
  //TODO: Probably make it quick and subtle
  // It should take away the focus from the background and the user shouldnt directly noticed the background fade
  // Could see the fridge all the time and just zoom on start
  // Could make the stars go to the left and make the fridge appear from the right
  // Could make the stars go forward and grow the fridge from the middle? (It should be quick)
  // Could make a really bright star in the middle and it will look like we are going to that star when going forward
  // and the star will be the fridge? ** Seems good, but hard
  beginBtn.style.display = "none";

  setTimeout(() => {
    frigo.classList.add("frigo-animation");
    frigoContainer.style.display = "block";
  }, 1600);

  setTimeout(() => {
    positionStar();
    star_logo.classList.add("animate_star");
  }, 1600 + 900 + 100);

  //TODO: Fade out button
}

function positionStar() {
  const rect = frigo.getBoundingClientRect();
  const x = rect.left + rect.width * 0.75;
  const y = rect.top + rect.height * 0.285;

  star_logo.style.left = `${x}px`;
  star_logo.style.top = `${y}px`;
  screenInteract.style.left = `${x}px`;
  screenInteract.style.top = `${y}px`;
}

window.addEventListener("resize", positionStar);
window.addEventListener("scroll", positionStar);
