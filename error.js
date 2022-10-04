// REGISTER ERROR OVERLAY
const showErrorOverlay = (err) => {
  // must be within function call because that's when the element is defined for sure.
  const ErrorOverlay = customElements.get("vite-error-overlay");
  // don't open outside vite environment
  if (!ErrorOverlay) {
    return;
  }
  console.log(err);
  const overlay = new ErrorOverlay(err);
  document.body.appendChild(overlay);
};
window.addEventListener(
  "error", showErrorOverlay);
window.addEventListener("error", ({
  error
}) => showErrorOverlay(error));