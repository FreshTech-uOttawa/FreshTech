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
document.addEventListener("DOMContentLoaded", async () => {
  const isGithub = window.location.hostname.includes("freshtech-uottawa");

  //Check all href in link/header/
  if (isGithub) {
    updateHref();
  }

  if (isGithub) {
    await loadHTML("nav-container", "/FreshTech/navigation/nav.html");
    updateHref();
  } else {
    await loadHTML("nav-container", "/navigation/nav.html");
  }
  const currentPage = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".gitPath");

  // Find the active page to add active class
  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href").split("/").pop();
    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });

  const path = window.location.pathname;

  if (path.endsWith("/") || path.endsWith("/index.html")) {
    loadHTML("accueil-container", "./pages/accueil/accueil.html");
  }
});

/**
 * Function which updates all href to use the correct pathing of Github pages.
 * This enables the navigation between pages locally and on github pages.
 */
function updateHref() {
  document.querySelectorAll(".gitPath").forEach((link) => {
    const href = link.getAttribute("href");
    if (href) {
      link.setAttribute("href", `/FreshTech/pages/${href}`);
    }
  });
}
