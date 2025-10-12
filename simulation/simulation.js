const app = document.querySelector(".screen");
const beginBtn = document.querySelector(".begin-simulation-btn");
const frigoContainer = document.querySelector(".frigo-container");
const frigo = document.querySelector(".frigo");
const starLogo = document.querySelector(".star_logo");
const screenInteract = document.querySelector(".interactable");
//TODO: Remove after completing App css/html
gsap.set(app, {
  opacity: 1,
  top: "60%",
  left: "50%",
  xPercent: -50,
  yPercent: -50,
  width: "65vw",
  height: "75vh",
});

isScreenVisible = false;

async function beginSimulation() {
  beginBtn.style.display = "none";

  setTimeout(() => {
    frigo.classList.add("frigo-animation");
    frigoContainer.style.display = "block";
  }, 1600);

  setTimeout(() => {
    positionStar();
  }, 1600 + 900 + 100);

  //TODO: Fade out button
}

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
      width: "60vw",
      height: "75vh",
    });
    return;
  }

  const rect = frigo.getBoundingClientRect();
  const x = rect.left + rect.width * 0.75;
  const y = rect.top + rect.height * 0.285;
  starLogo.style.display = "block";
  screenInteract.style.display = "block";

  // Star
  starLogo.style.left = `${x}px`;
  starLogo.style.top = `${y}px`;

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

const fridge = document.querySelector(".frigo-container");

starLogo.addEventListener("click", () => {
  isScreenVisible = true;
  const timeline = gsap.timeline();
  console.log(starLogo);
  timeline
    .to(starLogo, {
      scale: 3,
      y: -150,
      duration: 1.2,
      opacity: 0,
      ease: "power2.in",
    })
    .to(
      app,
      {
        opacity: 1,
        top: "60%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
        width: "65vw",
        height: "75vh",
        duration: 1.4,
        ease: "power3.inOut",
      },
      "-=0.3"
    )
    .to(
      fridge,
      {
        opacity: 0.2,
        filter: "blur(10px)",
        duration: 1,
      },
      "-=0.3"
    );
});
