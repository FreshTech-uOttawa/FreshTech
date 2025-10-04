import * as THREE from "https://cdn.jsdelivr.net/npm/three@latest/build/three.module.js";
// import * as THREE from "three";
// Some part of the code is directly taken from the documentation of Threejs (https://threejs.org/docs) with light / heavy changes.
// The mouse calculation is taken

// General Scene setup

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// TODO: Could render the stars with a fading in animation?
setupStars();
camera.position.z = 5;
camera.position.x = -15;
renderer.render(scene, camera);
setupCameraMovement();

/**
 * Function which setups the stars geometry by finding random position, random color and adding them to the scene.
 */
function setupStars() {
  const starGeometry = new THREE.BufferGeometry();
  const starCount = 5000;
  const positions = [];
  const colors = [];

  const color = new THREE.Color();
  // Random Position and Random color
  for (let i = 0; i < starCount; i++) {
    positions.push(
      // (Math.random() - 0.5) * 1000,
      // (Math.random() - 0.5) * 1000,
      // (Math.random() - 0.5) * 1000
      Math.floor((Math.random() - 0.5) * 1000),
      Math.floor((Math.random() - 0.5) * 1000),
      Math.floor((Math.random() - 0.5) * 1000)
    );

    // White
    let r = 0.8 + Math.random() * 0.2;
    let g = 0.8 + Math.random() * 0.2;
    let b = 0.8 + Math.random() * 0.2;

    const tintType = Math.floor(Math.random() * 10);
    if (tintType < 3) {
      // Yellow
      b = 153 / 255;
      g = 225 / 255;
      r = 255 / 255;
    } else if (tintType === 3) {
      // Blue
      b = 255 / 255;
      g = 51 / 255;
      r = 51 / 255;
    }

    color.setRGB(r, g, b);
    colors.push(color.r, color.g, color.b);
  }

  console.log(positions);

  starGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );
  starGeometry.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(colors, 3)
  );

  const starMaterial = new THREE.PointsMaterial({
    size: 0.6,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
  });

  const stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);
}

/**
 * Function which makes the camera follow the mouse movement in a set window [-1, 1] from the initial point
 */
function setupCameraMovement() {
  let targetRotationX = 0;
  let targetRotationY = 0;
  let currentRotationX = 0;
  let currentRotationY = 0;

  addEventListener("mousemove", (event) => {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    targetRotationY = mouseX * 0.1;
    targetRotationX = mouseY * 0.1;
  });

  function animate() {
    requestAnimationFrame(animate);

    currentRotationX += (targetRotationX - currentRotationX) * 0.05;
    currentRotationY += (targetRotationY - currentRotationY) * 0.05;

    camera.rotation.x = currentRotationX;
    camera.rotation.y = -currentRotationY;

    renderer.render(scene, camera);
  }

  animate();
}

// Resizing canva if the screen size is changed
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
