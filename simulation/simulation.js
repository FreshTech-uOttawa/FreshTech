import { strechCamera } from "./star_background.js";

const app = document.querySelector(".screen");
const beginBtn = document.querySelector(".begin-simulation-btn");
const frigoContainer = document.querySelector(".frigo-container");
const frigo = document.querySelector(".frigo");
const screenInteract = document.getElementById("starContainer");
const starLogo = document.getElementById("starCanvas");
const fridge = document.querySelector(".frigo-container");
const stopSimulationBtn = document.getElementById("stopSimulation");

let isScreenVisible = false;

async function beginSimulation() {
  beginBtn.style.display = "none";

  setTimeout(() => {
    frigo.classList.add("frigo-animation");
    frigoContainer.style.display = "block";
  }, 1600);

  setTimeout(() => {
    positionStar();
  }, 1600 + 900 + 100);
}

let starAnimated = false;
/**
 * Function which calculates where on the screen the interactable screen should be
 * This way, the interactable screen will appear exactly on the image regardless of the screen size
 */
function positionStar() {
  if (isScreenVisible) {
    gsap.set(app, {
      top: "60%",
      left: "50%",
      xPercent: -50,
      yPercent: -50,
      width: getWindowSize()[0],
      height: getWindowSize()[1],
    });
    return;
  }

  const rect = frigo.getBoundingClientRect();
  screenInteract.style.display = "flex";

  //Interactable Screen Position and Width/Height
  const screenX = rect.left + rect.width * 0.6;
  const screenY = rect.top + rect.height * 0.25;
  const screenWidth = rect.width * 0.333;
  const screenHeight = rect.height * 0.31;

  screenInteract.style.left = `${screenX}px`;
  screenInteract.style.top = `${screenY - screenHeight / 3}px`;
  screenInteract.style.width = `${screenWidth}px`;
  screenInteract.style.height = `${screenHeight}px`;

  starLogo.style.left = `${screenX}px`;
  starLogo.style.top = `${screenY - screenHeight / 3}px`;
  starLogo.style.width = `${screenWidth / 1.3}px`;
  starLogo.style.height = `${screenHeight / 1.3}px`;

  app.style.left = `${screenX}px`;
  app.style.top = `${screenY - screenHeight / 3}px`;
  app.style.width = `${screenWidth / 1.3}px`;
  app.style.height = `${screenHeight / 1.3}px`;

  if (!starAnimated) {
    gsap.to("#starContainer", {
      opacity: 1,
      duration: 1.5,
      ease: "power3.inOut",
    });
    gsap.from("#starContainer", {
      duration: 2.5,
      y: 270,
      ease: "circ.out",
    });
    starAnimated = true;
  }

  strechCamera();
}

window.addEventListener("resize", positionStar);
window.addEventListener("scroll", positionStar);
document.getElementById("beginSimulation").addEventListener("click", () => {
  beginSimulation();
});
screenInteract.addEventListener("click", () => {
  animateScreen();
});
stopSimulationBtn.addEventListener("click", () => {
  closeScreen();
});

/**
 * Function which animates the screen to appear.
 * From the star logo disappearing, the fridge disappearing and the screen appearing
 * and adjusting the size according to the screen size
 */
function animateScreen() {
  isScreenVisible = true;
  const timeline = gsap.timeline();
  gsap.set(".screen", { display: "flex" });
  gsap.set(stopSimulationBtn, { display: "flex" });
  timeline
    .to(screenInteract, {
      y: -100,
      duration: 1.5,
      opacity: 0,
      ease: "circ.in",
      immediateRender: false,
    })
    .to(
      fridge,
      {
        opacity: 0.1,
        duration: 1,
      },
      "-=0.5"
    )
    .to(
      ".title",
      {
        opacity: 0.1,
        duration: 1,
      },
      "-=1.5"
    )
    .to(
      app,
      {
        opacity: 1,
        top: "60%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
        width: getWindowSize()[0],
        height: getWindowSize()[1],
        duration: 1.4,
        ease: "power3.inOut",
      },
      "-=1"
    )
    .to(
      stopSimulationBtn,
      {
        opacity: 1,
      },
      "-=0.8"
    );
}

/**
 * Get window size based on the screen size
 * @returns Width and height
 */
function getWindowSize() {
  const viewWidth = window.innerWidth;
  const viewHeight = window.innerHeight;

  let appWidth = viewWidth * 0.9;
  let appHeight = viewHeight * 0.9;

  const minWidth = 320;
  const maxWidth = 480;
  const minHeight = 550;
  const maxHeight = 700;

  appWidth = Math.max(minWidth, Math.min(appWidth, maxWidth));
  appHeight = Math.max(minHeight, Math.min(appHeight, maxHeight));

  return [appWidth, appHeight];
}

/**
 * Function which hides the screens and goes back to the fridge
 */
async function closeScreen() {
  const timeline = gsap.timeline();
  isScreenVisible = false;
  await timeline
    .to(app, {
      opacity: 0,
      top: "25%",
      left: "45%",
      xPercent: 50,
      yPercent: 50,
      duration: 1,
      ease: "power3.in",
      width: getWindowSize()[0] / 2,
      height: getWindowSize()[1] / 2,
    })
    .to(
      ".title",
      {
        opacity: 1,
        duration: 1,
      },
      "-=1"
    )
    .to(
      fridge,
      {
        opacity: 1,
        duration: 1,
      },
      "-=1"
    )
    .to(
      stopSimulationBtn,
      {
        opacity: 0,
        duration: 1,
      },
      "-=1.5"
    )
    .then(() => {
      stopSimulationBtn.style.display = "none";
    });

  gsap.fromTo(
    screenInteract,
    { y: 100, opacity: 0 },
    {
      scale: 1,
      y: 0,
      duration: 1.5,
      opacity: 1,
      ease: "circ.out",
    }
  );
}

/**
 * Function which updates the date and the time
 */
function updateDateTime() {
  const now = new Date();

  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const year = now.getFullYear();
  const dateStr = `${month}/${day}/${year}`;

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const timeStr = `${hours}:${minutes}`;

  document.getElementById("date").textContent = dateStr;
  document.getElementById("time").textContent = timeStr;
}

setInterval(updateDateTime, 1000);
updateDateTime();
