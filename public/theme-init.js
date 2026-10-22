// Runs before the page appears: applies the visitor's saved theme (light/dark)
// so the page doesn't flash the wrong colors. Dark is the default.
(function () {
  try {
    var saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
      document.documentElement.setAttribute("data-theme", saved);
    }
  } catch {
    // Storage blocked (private mode etc.): keep the default dark theme.
  }
})();
