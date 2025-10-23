/**
 * Function which loads pages from other files dynamically
 * @param {string} targetId Id of the place we want to place it
 * @param {string} filePath THe path of the file to load
 * @returns
 */
async function loadHTML(targetId, filePath) {
  const container = document.getElementById(targetId);
  if (!container) {
    return;
  }
  const response = await fetch(filePath);
  if (response.ok) {
    container.innerHTML = await response.text();
  } else {
    container.innerHTML = `<p>Error loading ${filePath}</p>`;
  }
}

/* Loading the navigation when the page loaded */
document.addEventListener("DOMContentLoaded", () => {
  // if (window.location.hostname.endsWith("FreshTech/")) {
  //   loadHTML("nav-container", "/navigation/nav.html");
  // } else {
  loadHTML("nav-container", "/navigation/nav.html");
  // }

  const path = window.location.pathname;

  if (path.endsWith("/") || path.endsWith("/index.html")) {
    loadHTML("accueil-container", "./Accueil/PageAccueil.html");
  }
});
