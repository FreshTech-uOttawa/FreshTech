const screen = document.querySelector(".screen");
const beginBtn = document.querySelector(".begin-simulation-btn");
const frigoContainer = document.querySelector(".frigo-container");
const frigo = document.querySelector(".frigo");
const star_logo = document.querySelector(".star_logo");
const screenInteract = document.querySelector(".interactable");

isScreenVisible = false;

async function beginSimulation() {
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

/**
 * Function which calculates where on the screen the interactable screen should be
 * This way, the interactable screen will appear exactly on the image regardless of the screen size
 */
function positionStar() {
  if (isScreenVisible) {
    return;
  }

  const rect = frigo.getBoundingClientRect();
  const x = rect.left + rect.width * 0.75;
  const y = rect.top + rect.height * 0.285;
  star_logo.style.display = "block";
  screenInteract.style.display = "block";

  // Star
  star_logo.style.left = `${x}px`;
  star_logo.style.top = `${y}px`;

  //Interactable Screen Position and Width/Height
  const screenX = rect.left + rect.width * 0.6;
  const screenY = rect.top + rect.height * 0.25;
  const screenWidth = rect.width * 0.333;
  const screenHeight = rect.height * 0.31;

  screenInteract.style.left = `${screenX}px`;
  screenInteract.style.top = `${screenY - screenHeight / 3}px`;
  screenInteract.style.width = `${screenWidth}px`;
  screenInteract.style.height = `${screenHeight}px`;
}

window.addEventListener("resize", positionStar);
window.addEventListener("scroll", positionStar);

screenInteract.addEventListener("click", showPolarisMenu);

function showPolarisMenu() {
  //TODO:
  // Make the screen big, and hide everything else (except title/menu?)
  //Placeholder code for now
  isScreenVisible = true;

  screen.style.display = "flex";
  star_logo.style.display = "none";
  screenInteract.style.display = "none";
}
